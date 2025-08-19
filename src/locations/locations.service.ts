import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { buildQueryAndPagination } from 'src/common/helpers/query-builder';
import { FilterLocationsDto } from './dto/filter-locations.dto';

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

  async findAll(query: FilterLocationsDto) {
    try {
      const { filter, pagination } = buildQueryAndPagination(query, {
        allowedFilters: {
          appears: { type: 'stringInArray', path: 'appears' },
          state: { type: 'string', path: 'state' },
        },
        defaultSortBy: 'createdAt',
      });

      // filter by chapterId
      if (query.chapterId) {
        const pipeline: any[] = [
          {
            $lookup: {
              from: 'chapters',
              localField: '_id',
              foreignField: 'locations._id',
              as: 'chapters',
            },
          },
          {
            $match: {
              'chapters._id': new Types.ObjectId(query.chapterId),
              ...filter,
            },
          },
          {
            $project: {
              chapters: 0, // no incluimos el array de chapters en el resultado
            },
          },
          { $sort: pagination.sort },
          { $skip: pagination.skip },
          { $limit: pagination.limit },
        ];
        const data = await this.locationModel.aggregate(pipeline);

        const total = await this.locationModel.aggregate([
          {
            $lookup: {
              from: 'chapters',
              localField: '_id',
              foreignField: 'locations._id',
              as: 'chapters',
            },
          },
          {
            $match: {
              'chapters._id': new Types.ObjectId(query.chapterId),
              ...filter,
            },
          },
          { $count: 'total' },
        ]);

        return {
          total: total[0]?.total ?? 0,
          page: pagination.page,
          limit: pagination.limit,
          data,
        };
      }
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
