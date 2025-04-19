import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async createOrUpdate(@Body() body: CreateLocationDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.locationsService.update(_id, rest);
    }
    return this.locationsService.create(body);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
