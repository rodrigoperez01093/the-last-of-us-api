import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorsService } from './actor.service';
import { ActorsController } from './actor.controller';
import { Actor, ActorSchema } from './schemas/actor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorModule {}
