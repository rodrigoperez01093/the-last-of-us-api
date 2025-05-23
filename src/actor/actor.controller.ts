import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ActorsService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actor')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  // TODO: generar data de actores, luego algunos characters y hacer join, con este fluijo ok puedo i cargando otras tablas para luego conectarlas
  @Post()
  createOrUpdate(@Body() body: CreateActorDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.actorsService.update(_id, rest);
    }
    return this.actorsService.create(body);
  }

  @Get()
  findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(id);
  }
}
