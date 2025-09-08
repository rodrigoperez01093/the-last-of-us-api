import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class NamedReferenceDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class LocationReferenceDto {
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

class GroupReferenceDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}

class CharacterOrNoteDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NamedReferenceDto)
  characters: NamedReferenceDto[];

  @IsArray()
  @IsString({ each: true })
  notes: string[];
}

class LocationOrNoteDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationReferenceDto)
  locations: LocationReferenceDto[];

  @IsArray()
  @IsString({ each: true })
  notes: string[];
}

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  other_names?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  group_type?: string[];

  @IsOptional()
  @IsString()
  founded?: string;

  /** headquarters puede ser string o objeto */
  @IsOptional()
  @Type(() => LocationOrNoteDto)
  @ValidateNested()
  headquarters?: LocationOrNoteDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationReferenceDto)
  locations?: LocationReferenceDto[];

  @IsOptional()
  @Type(() => CharacterOrNoteDto)
  @ValidateNested()
  leaders?: CharacterOrNoteDto;

  @IsOptional()
  @Type(() => CharacterOrNoteDto)
  @ValidateNested()
  members?: CharacterOrNoteDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupReferenceDto)
  allies?: GroupReferenceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupReferenceDto)
  enemies?: GroupReferenceDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  appears?: string[];
}
