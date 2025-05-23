import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collectible } from './schemas/collectibles.schema';
import { CreateCollectiblesDto } from './dto/create-collectibles.dto';
import { UpdateCollectiblesDto } from './dto/update-collectibles.dto';

@Injectable()
export class CollectiblesService {
  constructor(
    @InjectModel(Collectible.name)
    private readonly collectibleModel: Model<Collectible>,
  ) {}

  async create(
    createCollectibleDto: CreateCollectiblesDto,
  ): Promise<Collectible> {
    try {
      const createdCollectible = new this.collectibleModel(
        createCollectibleDto,
      );
      return createdCollectible.save();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el collectible');
    }
  }

  async findAll(query?: { name?: string }): Promise<Collectible[]> {
    try {
      const filter: any = {};
      if (query?.name) {
        filter.name = { $regex: query.name, $options: 'i' }; // insensible a mayúsculas/minúsculas
      }
      return this.collectibleModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar collectibles');
    }
  }

  async findOne(id: string): Promise<Collectible> {
    try {
      const collectible = await this.collectibleModel.findById(id).exec();
      if (!collectible) {
        throw new NotFoundException(`Collectible with id ${id} not found`);
      }
      return collectible;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar collectible');
    }
  }

  async update(
    id: string,
    updateCollectiblesDto: UpdateCollectiblesDto,
  ): Promise<Collectible | null> {
    return this.collectibleModel
      .findByIdAndUpdate(id, updateCollectiblesDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Collectible | null> {
    return this.collectibleModel.findByIdAndDelete(id).exec();
  }
}
