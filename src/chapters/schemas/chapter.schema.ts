import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChapterDocument = Chapter & Document;
@Schema({ timestamps: true })
export class Chapter {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  game: string;

  @Prop({ required: true })
  date: string;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Location', required: true },
        name: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
      },
    ],
    default: [],
  })
  locations: {
    _id: Types.ObjectId;
    name: string;
    city: string;
    state: string;
  }[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Character', required: true },
        name: { type: String, required: true },
      },
    ],
    default: [],
  })
  playable_character: {
    _id: Types.ObjectId;
    name: string;
  }[];

  @Prop({
    type: Map,
    of: [
      {
        _id: { type: Types.ObjectId, ref: 'Collectible', required: true },
        name: { type: String, required: true },
      },
    ],
    default: {},
  })
  collectibles: Map<string, { _id: Types.ObjectId; name: string }[]>;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
