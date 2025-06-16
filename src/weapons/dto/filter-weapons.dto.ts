// src/collectibles/dto/filter-collectibles.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class FilterWeaponsDto {
  @ApiPropertyOptional({ description: 'Character ID' })
  @IsOptional()
  @IsMongoId()
  character?: string;

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Limit per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
