// character.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CollectibleDocument = Collectible & Document;

@Schema({
  discriminatorKey: 'type',
  timestamps: true,
})
export class Collectible {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['coin', 'comic', 'trading_card'] })
  type: string;

  @Prop({ required: true })
  game: string;

  @Prop({ required: true })
  chapter: string;

  @Prop({
    type: {
      hint: { type: String, required: true },
      walkthrough: { type: String, required: true },
    },
    required: true,
    _id: false,
  })
  location: {
    hint: string;
    walkthrough: string;
  };

  @Prop({ required: true })
  number: number;
}

export const CollectibleSchema = SchemaFactory.createForClass(Collectible);

@Schema({ _id: false })
export class TradingCardCollectible {
  @Prop({ required: true })
  real_name: string;

  @Prop({ required: true })
  brains: number;

  @Prop({ required: true })
  brawn: number;

  @Prop({ required: true })
  affiliation: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ['HERO', 'VILLAIN', 'NEUTRAL VILLAIN', 'NEUTRAL HERO'],
  })
  character_type: string;
}

export const TradingCardCollectibleSchema = SchemaFactory.createForClass(
  TradingCardCollectible,
);
