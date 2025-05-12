// dto/create-character.dto.ts

import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ActorVoiceDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;
}

class RelationshipDto {
  @IsString()
  name: string;

  @IsString()
  type: string;
}

class LocationsDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}

class WeaponOrCollectibleDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;
}

export class CreateCharacterDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => ActorVoiceDto)
  actor_voice: ActorVoiceDto;

  @IsOptional()
  @IsString()
  birthdate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ages?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  other_names?: string[];

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  occupations?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  affiliations?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationshipDto)
  relationships?: RelationshipDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resides?: LocationsDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  height?: string[];

  @IsOptional()
  @IsString()
  hair_color?: string;

  @IsOptional()
  @IsString()
  eye_color?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeaponOrCollectibleDto)
  weapons?: WeaponOrCollectibleDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeaponOrCollectibleDto)
  collectibles?: WeaponOrCollectibleDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  appears?: string[];
}
