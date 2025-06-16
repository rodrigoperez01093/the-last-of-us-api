import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { FilterCharactersDto } from './dto/filter-characters.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  createOrUpdate(@Body() body: CreateCharacterDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.charactersService.update(_id, rest);
    }
    return this.charactersService.create(body);
  }

  @Get()
  findAll(@Query() query: FilterCharactersDto) {
    return this.charactersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
