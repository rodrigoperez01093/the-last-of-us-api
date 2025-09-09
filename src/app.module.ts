import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ActorModule } from './actor/actor.module';
import { LocationsModule } from './locations/locations.module';
import { WeaponsModule } from './weapons/weapons.module';
import { CollectiblesModule } from './collectibles/collectibles.module';
import { ChaptersModule } from './chapters/chapters.module';
import { GroupsModule } from './groups/groups.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './characters/characters.module';

@Module({
  imports: [
    // hace que Nest lea el .env automáticamente
    ConfigModule.forRoot({
      isGlobal: true, // no hace falta importar ConfigModule en cada módulo
    }),

    // lee el valor desde la variable de entorno
    MongooseModule.forRoot(process.env.MONGO_URI!),

    CharacterModule,
    ActorModule,
    LocationsModule,
    WeaponsModule,
    CollectiblesModule,
    ChaptersModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
