import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { ObjectId } from 'mongoose';

@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  async createOrUpdate(@Body() body: CreateWeaponDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.weaponsService.update(_id, rest);
    }
    return this.weaponsService.create(body);
  }

  @Get()
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.weaponsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponsService.remove(+id);
  }
}
