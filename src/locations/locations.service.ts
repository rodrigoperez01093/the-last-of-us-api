import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

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

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
