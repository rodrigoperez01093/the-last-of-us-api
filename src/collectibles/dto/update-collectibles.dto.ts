import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectiblesDto } from './create-collectibles.dto';

export class UpdateCollectiblesDto extends PartialType(CreateCollectiblesDto) {}
