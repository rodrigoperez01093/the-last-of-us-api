import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterChaptersDto } from './dto/filter-chapters.dto';
import { buildQueryAndPagination } from 'src/common/helpers/query-builder';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<ChapterDocument>,
  ) {}
  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    try {
      const createdChapter = new this.chapterModel(createChapterDto);
      return await createdChapter.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('No se pudo crear el capítulo');
    }
  }

  async findAll(query: FilterChaptersDto) {
    try {
      const { filter, pagination } = buildQueryAndPagination(query, {
        allowedFilters: {
          game: 'string',
        },
        defaultSortBy: 'createdAt',
      });
      const [data, total] = await Promise.all([
        this.chapterModel
          .find(filter)
          .sort(pagination.sort)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .exec(),
        this.chapterModel.countDocuments(filter),
      ]);
      return {
        total,
        page: pagination.page,
        limit: pagination.limit,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar chapters');
    }
  }

  async findOne(id: string): Promise<Chapter> {
    const chapter = await this.chapterModel.findById(id).exec();
    if (!chapter) {
      throw new NotFoundException(
        `No se encontró un capítulo con el id: ${id}`,
      );
    }
    return chapter;
  }

  async update(id: string, updateDto: UpdateChapterDto): Promise<Chapter> {
    const updated = await this.chapterModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new NotFoundException(
        `No se pudo actualizar el capítulo con id: ${id}`,
      );
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.chapterModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`No se encontró el capítulo con id: ${id}`);
    }
  }
}
