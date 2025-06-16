// src/collectibles/dto/filter-collectibles.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterCollectiblesDto {
  @ApiPropertyOptional({ enum: ['coin', 'comic', 'trading_card'] })
  @IsOptional()
  @IsIn(['coin', 'comic', 'trading_card'])
  type?: string;

  @ApiPropertyOptional({ description: 'Character ID' })
  @IsOptional()
  @IsMongoId()
  character?: string;

  @ApiPropertyOptional({ description: 'Chapter ID' })
  @IsOptional()
  @IsMongoId()
  chapter?: string;

  @ApiPropertyOptional({ description: 'Partial match for name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Limit per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: ['name', 'type', 'number', 'createdAt'],
    example: 'name',
  })
  @IsOptional()
  @IsIn(['name', 'type', 'number', 'createdAt'])
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order (asc or desc)' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
