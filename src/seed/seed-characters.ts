import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Actor } from '../actor/schemas/actor.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const data = require('./actors.json');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const actorModel = app.get<Model<Actor>>(getModelToken(Actor.name));

  try {
    await actorModel.deleteMany({});
    await actorModel.insertMany(data);
    console.log('✔ Actores insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando actores:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
