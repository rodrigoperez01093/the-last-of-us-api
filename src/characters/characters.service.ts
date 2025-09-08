import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Character } from './schemas/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { FilterCharactersDto } from './dto/filter-characters.dto';
import { buildQueryAndPagination } from 'src/common/helpers/query-builder';
import { Group } from 'src/groups/schemas/group.schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,

    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    try {
      const createdCharacter = new this.characterModel(createCharacterDto);
      return createdCharacter.save();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el character');
    }
  }
  // Todo chequear esta partew
  async findAll(query: FilterCharactersDto) {
    try {
      const { filter, pagination } = buildQueryAndPagination(query, {
        allowedFilters: {
          name: 'regex',
          status: 'string',
          gender: 'string',
          appears: { type: 'stringInArray', path: 'appears' },
        },
        defaultSortBy: 'createdAt',
      });

      // filter by groupId
      if (query.affiliationGroup) {
        const group = await this.groupModel.findById(query.affiliationGroup, {
          'members.characters._id': 1,
          'leaders.characters._id': 1,
        });

        if (!group) {
          return {
            total: 0,
            page: pagination.page,
            limit: pagination.limit,
            data: [],
          };
        }

        const memberIds = group.members.characters.map((c) => c._id);
        const leaderIds = group.leaders.characters.map((c) => c._id);
        const allIds = [...new Set([...memberIds, ...leaderIds])];

        const finalFilter = {
          ...filter,
          _id: { $in: allIds },
        };

        const [data, total] = await Promise.all([
          this.characterModel
            .find(finalFilter)
            .sort(pagination.sort)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .exec(),
          this.characterModel.countDocuments(finalFilter),
        ]);

        return {
          total,
          page: pagination.page,
          limit: pagination.limit,
          data,
        };
      }

      const [data, total] = await Promise.all([
        this.characterModel
          .find(filter)
          .sort(pagination.sort)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .exec(),
        this.characterModel.countDocuments(filter),
      ]);

      return {
        total,
        page: pagination.page,
        limit: pagination.limit,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar characters');
    }
  }

  async findOne(id: string): Promise<Character> {
    try {
      const character = await this.characterModel.findById(id).exec();
      if (!character) {
        throw new NotFoundException(`Character with id ${id} not found`);
      }
      return character;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar character');
    }
  }

  async findAllNames() {
    return this.characterModel.find().select('_id name').exec();
  }

  async update(
    id: string, // Todo chequear esta partew
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character | null> {
    return this.characterModel
      .findByIdAndUpdate(id, updateCharacterDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Character | null> {
    return this.characterModel.findByIdAndDelete(id).exec();
  }
}
