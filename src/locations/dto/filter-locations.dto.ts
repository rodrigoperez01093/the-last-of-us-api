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
import states from '../../common/Resources/states.json';
export class FilterLocationsDto {
  @ApiPropertyOptional({
    enum: gameTitles,
  })
  @IsOptional()
  @IsIn(gameTitles)
  appears?: string;

  @ApiPropertyOptional({
    description:
      'Chapter ID where the location appears (use values from /chapters/enums)',
    example: '65c4b7a36a2a4d001f0d5f9a',
  })
  @IsOptional()
  @IsMongoId()
  chapterId?: string;

  @ApiPropertyOptional({
    enum: states,
  })
  @IsOptional()
  @IsIn(states)
  state?: string;

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Limit per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
