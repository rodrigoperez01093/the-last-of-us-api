import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FilterCharactersDto } from 'src/characters/dto/filter-characters.dto';
import { buildQueryAndPagination } from 'src/common/helpers/query-builder';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const newLocation = new this.locationModel(createLocationDto);
    return newLocation.save();
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const updated = await this.locationModel.findByIdAndUpdate(
      id,
      updateLocationDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    return updated;
  }

  async findAll(query: FilterCharactersDto) {
    try {
      const { filter, pagination } = buildQueryAndPagination(query, {
        allowedFilters: {
          appears: { type: 'stringInArray', path: 'appears' },
        },
        defaultSortBy: 'createdAt',
      });

      const [data, total] = await Promise.all([
        this.locationModel
          .find(filter)
          .sort(pagination.sort)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .exec(),
        this.locationModel.countDocuments(filter),
      ]);

      return {
        total,
        page: pagination.page,
        limit: pagination.limit,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar locations');
    }
  }

  findOne(id: ObjectId) {
    return this.locationModel.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
