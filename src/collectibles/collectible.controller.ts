import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CollectiblesService } from './collectibles.service';
import { CreateCollectiblesDto } from './dto/create-collectibles.dto';
import { FilterCollectiblesDto } from './dto/filter-collectibles.dto';

@Controller('collectibles')
export class CollectiblesController {
  constructor(private readonly collectibleService: CollectiblesService) {}

  @Post()
  createOrUpdate(@Body() body: CreateCollectiblesDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.collectibleService.update(_id, rest);
    }
    return this.collectibleService.create(body);
  }

  @Get()
  findAll(@Query() query: FilterCollectiblesDto) {
    return this.collectibleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectibleService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectibleService.remove(id);
  }
}
