import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Weapon {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  caliber: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ type: [String], required: false })
  capacity?: string[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Character', required: true },
        name: { type: String, required: true },
      },
    ],
    default: [],
  })
  character: {
    _id: Types.ObjectId;
    name: string;
  }[];
}

export type WeaponDocument = Weapon & Document;
export const WeaponSchema = SchemaFactory.createForClass(Weapon);
