import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actor } from './schemas/actor.schema';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actor.name) private readonly actorModel: Model<Actor>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    try {
      const actor = new this.actorModel(createActorDto);
      return await actor.save();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el actor');
    }
  }

  async findAll(): Promise<Actor[]> {
    try {
      return await this.actorModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar actores');
    }
  }

  async findOne(id: string): Promise<Actor> {
    try {
      const actor = await this.actorModel.findById(id).exec();
      if (!actor) {
        throw new NotFoundException(`No se encontró el actor con id: ${id}`);
      }
      return actor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar actor');
    }
  }
}
