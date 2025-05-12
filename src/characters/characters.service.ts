import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './schemas/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    try {
      const createdCharacter = new this.characterModel(createCharacterDto);
      return createdCharacter.save();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el character');
    }
  }

  async findAll(query?: { name?: string }): Promise<Character[]> {
    try {
      const filter: any = {};
      if (query?.name) {
        filter.name = { $regex: query.name, $options: 'i' }; // insensible a mayúsculas/minúsculas
      }
      return this.characterModel.find().exec();
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

  async update(
    id: string,
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
