import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class FilterWeaponsDto {
  @ApiPropertyOptional({
    description: 'weapons by Character ID (use values from /character/enums)',
    example: '6827fba8a131b61e133b6b94',
  })
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
