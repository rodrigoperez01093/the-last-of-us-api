// src/collectibles/dto/filter-collectibles.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class FilterChaptersDto {
  @ApiPropertyOptional({
    enum: ['The Last of Us Part I', 'The Last of Us Part II'],
  })
  @IsOptional()
  @IsIn(['The Last of Us Part I', 'The Last of Us Part II'])
  game?: string;

  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Limit per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
