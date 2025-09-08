// src/collectibles/dto/filter-collectibles.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import gameTitles from '../../common/Resources/gameTitles.json';

export class FilterCharactersDto {
  @ApiPropertyOptional({ description: 'Partial match for name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: ['Alive', 'Dead', 'Unknown'],
  })
  @IsOptional()
  @IsIn(['Alive', 'Dead', 'Unknown'])
  status?: string;

  @ApiPropertyOptional({
    enum: ['Male', 'Female', 'Other'],
  })
  @IsOptional()
  @IsIn(['Male', 'Female', 'Other'])
  gender?: string;

  @ApiPropertyOptional({
    description:
      'Group ID where the characters belongs (use values from /groups/enums)',
    example: '65c4b7a36a2a4d001f0d5f9a',
  })
  @IsOptional()
  @IsMongoId()
  affiliationGroup?: string;

  @ApiPropertyOptional({
    enum: gameTitles,
  })
  @IsOptional()
  @IsIn(gameTitles)
  appears?: string;

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Limit per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
