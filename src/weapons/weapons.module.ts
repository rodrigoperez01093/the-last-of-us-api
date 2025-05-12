import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Weapon, WeaponSchema } from './schemas/weapon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weapon.name, schema: WeaponSchema }]),
  ],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
