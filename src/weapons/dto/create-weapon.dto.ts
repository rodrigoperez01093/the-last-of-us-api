import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';

class CharacterDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}
export class CreateWeaponDto {
  @IsMongoId()
  _id: string;

  @IsString()
  type: string;

  @IsString()
  model: string;

  @IsString()
  caliber: string;

  @IsString()
  weight: string;

  @IsString()
  manufacturer: string;

  @IsArray()
  @IsString({ each: true })
  capacity: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  character: CharacterDto[];

  @IsOptional()
  @IsString()
  description?: string;
}
