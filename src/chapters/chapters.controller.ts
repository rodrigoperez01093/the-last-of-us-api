import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { FilterChaptersDto } from './dto/filter-chapters.dto';
import { ChapterEnumDto } from './dto/chapter-enum.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  createOrUpdate(@Body() body: CreateChapterDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.chaptersService.update(_id, rest);
    }
    return this.chaptersService.create(body);
  }

  @Get()
  findAll(@Query() query: FilterChaptersDto) {
    return this.chaptersService.findAll(query);
  }

  @Get('enums')
  @ApiOkResponse({
    type: ChapterEnumDto,
    isArray: true,
    description: 'List of available chapters',
  })
  async getChaptersEnum() {
    const chapters = await this.chaptersService.findAllNames();
    return chapters.map((c) => ({ label: c.name, value: c._id }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(id);
  }
}
