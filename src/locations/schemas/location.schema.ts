import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ type: [String], default: [] })
  type?: string[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false }, // opcional
      },
    ],
    required: false,
  })
  inhabitants?: {
    _id: Types.ObjectId;
    name: string;
    description?: string;
  }[];

  @Prop({ type: [String], required: false })
  appears?: string[];
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
