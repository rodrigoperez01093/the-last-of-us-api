import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorModule } from './actor/actor.module';
import { LocationsModule } from './locations/locations.module';
import { WeaponsModule } from './weapons/weapons.module';
import { CollectiblesModule } from './collectibles/collectibles.module';
import { ChaptersModule } from './chapters/chapters.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tlou'),
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
