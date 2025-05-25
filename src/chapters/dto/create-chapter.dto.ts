import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator';

class LocationsDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}

class CollectiblesDto {
  @IsArray()
  @IsMongoId({ each: true })
  trading_card: string[];
}

class CharacterSummaryDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

export class CreateChapterDto {
  @IsString()
  name: string;

  @IsString()
  game: string;

  @IsString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationsDto)
  locations: LocationsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterSummaryDto)
  playable_character: CharacterSummaryDto[];

  @ValidateNested()
  @Type(() => CollectiblesDto)
  collectibles: CollectiblesDto;
}
