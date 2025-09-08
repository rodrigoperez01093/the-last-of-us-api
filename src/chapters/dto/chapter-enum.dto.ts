import { ApiProperty } from '@nestjs/swagger';

export class ChapterEnumDto {
  @ApiProperty({ example: '65c4b7a36a2a4d001f0d5f9a' })
  value: string; // el ObjectId

  @ApiProperty({ example: 'Chapter 1: The Beginning' })
  label: string;
}
