// dto/create-character.dto.ts

import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export enum CollectibleType {
  COIN = 'coin',
  COMIC = 'comic',
  TRADING_CARD = 'trading_card',
}

export enum CharacterType {
  HERO = 'HERO',
  HEROES = 'HEROES',
  VILLAIN = 'VILLAIN',
  NEUTRAL_VILLAIN = 'NEUTRAL VILLAIN',
  NEUTRAL_HERO = 'NEUTRAL HERO',
  NEUTRAL = 'NEUTRAL',
}

class LocationDto {
  @IsString()
  hint: string;

  @IsString()
  walkthrough: string;
}

class ChapterDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

class CharacterDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}
export class CreateCollectiblesDto {
  @IsString()
  name: string;

  @IsString()
  type: CollectibleType;

  @IsString()
  game: string;

  @ValidateNested()
  @Type(() => ChapterDto)
  chapter: ChapterDto;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsNumber()
  number: number;

  @ValidateNested()
  @Type(() => CharacterDto)
  character: CharacterDto;

  // === Trading card fields ===
  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsString()
  @IsNotEmpty()
  real_name: string;

  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsNumber()
  @IsNotEmpty()
  brains: number;

  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsNumber()
  @IsNotEmpty()
  brawn: number;

  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsString()
  @IsNotEmpty()
  affiliation: string;

  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateIf((o) => o.type === CollectibleType.TRADING_CARD)
  @IsString()
  @IsNotEmpty()
  character_type: CharacterType;
}
