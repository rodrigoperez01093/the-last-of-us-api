import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class ActorDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;
}

class FactionDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

class ReferenceDto {
  @IsMongoId()
  _id: string;
}

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsBoolean()
  is_enemy: boolean;

  @ValidateNested()
  @Type(() => ActorDto)
  actor: ActorDto;

  @ValidateNested()
  @Type(() => FactionDto)
  faction: FactionDto;

  //   @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => ReferenceDto)
  //   weapons: ReferenceDto[];

  //   @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => ReferenceDto)
  //   collectibles: ReferenceDto[];
}
