import { ApiProperty } from '@nestjs/swagger';

export class CharacterEnumDto {
  @ApiProperty({ example: '65c4b7a36a2a4d001f0d5f9a' })
  value: string; // el ObjectId

  @ApiProperty({ example: 'Ellie Williams' })
  label: string;
}
