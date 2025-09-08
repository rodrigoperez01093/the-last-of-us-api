import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { CharactersService } from './characters.service';
import { CharacterController } from './characters.controller';
import { Module } from '@nestjs/common';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [CharacterController],
  providers: [CharactersService],
})
export class CharacterModule {}
