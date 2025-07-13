// character.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: 'Actor', required: false },
      name: { type: String, required: false },
    },
    required: false,
    default: {},
  })
  actor_voice?: {
    _id?: Types.ObjectId;
    name?: string;
  };

  @Prop({ default: 'Unknown' })
  birthdate?: string;

  @Prop({ type: [String], default: [] })
  ages?: string[];

  @Prop({ type: [String], default: [] })
  other_names?: string[];

  @Prop({ default: 'Unknown' })
  gender?: string;

  @Prop({ default: 'Unknown' })
  status?: string;

  @Prop({ type: [String], default: [] })
  occupations?: string[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Group', required: true },
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    default: [],
  })
  affiliations?: {
    _id: Types.ObjectId;
    name: string;
    description?: string;
  }[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Character', required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    default: [],
  })
  relationships?: {
    _id: Types.ObjectId;
    name: string;
    type: string;
  }[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Location', required: true },
        name: { type: String, required: true },
        state: { type: String, required: true },
        description: { type: String }, // Solo vive en Character
      },
    ],
    default: [],
  })
  resides: {
    _id: Types.ObjectId;
    name: string;
    state: string;
    description?: string;
  }[];

  @Prop({
    type: [String],
    default: [],
  })
  height?: string[];

  @Prop({ default: 'Unknown' })
  hair_color?: string;

  @Prop({ default: 'Unknown' })
  eye_color?: string;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Weapon' },
        type: { type: String, required: true },
        model: { type: String, required: true },
      },
    ],
    default: [],
  })
  weapons?: {
    _id: Types.ObjectId;
    type: string;
    model: string;
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
  collectibles?: Map<string, { _id: Types.ObjectId; name: string }[]>;

  @Prop({ type: [String], default: [] })
  appears?: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
