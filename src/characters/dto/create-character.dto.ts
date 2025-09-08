// dto/create-character.dto.ts

import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class ActorVoiceDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

class RelationshipDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;
}

class AffiliationsDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class LocationsDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class WeaponOrCollectibleDto {
  @IsMongoId()
  _id: string;

  @IsString()
  type: string;

  @IsString()
  model: string;
}

class CollectiblesItemDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

class CollectiblesDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CollectiblesItemDto)
  trading_card?: CollectiblesItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CollectiblesItemDto)
  coin?: CollectiblesItemDto[];
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
  @ValidateNested({ each: true })
  @Type(() => AffiliationsDto)
  affiliations?: AffiliationsDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationshipDto)
  relationships?: RelationshipDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationsDto)
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
  @ValidateNested({ each: true })
  @Type(() => CollectiblesDto)
  collectibles?: CollectiblesDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  appears?: string[];
}
