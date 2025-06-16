// src/collectibles/dto/filter-collectibles.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

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
    enum: [
      'The Last of Us: American Dreams',
      'The Last of Us Part I',
      'The Last of Us: Left Behind',
      'The Last of Us: One Night Live',
      'The Last of Us Part II',
    ],
  })
  @IsOptional()
  @IsIn([
    'The Last of Us: American Dreams',
    'The Last of Us Part I',
    'The Last of Us: Left Behind',
    'The Last of Us: One Night Live',
    'The Last of Us Part II',
  ])
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
