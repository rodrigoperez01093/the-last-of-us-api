import { IsOptional, IsString, IsArray, IsMongoId } from 'class-validator';

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

  @IsOptional()
  @IsString()
  description?: string;
}
