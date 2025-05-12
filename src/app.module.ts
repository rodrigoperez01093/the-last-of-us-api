import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorModule } from './actor/actor.module';
import { LocationsModule } from './locations/locations.module';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tlou'),
    CharacterModule,
    ActorModule,
    LocationsModule,
    WeaponsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
