import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ActorsService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actor')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  // TODO: generar data de actores, luego algunos characters y hacer join, con este fluijo ok puedo i cargando otras tablas para luego conectarlas

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
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
