// character.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Relationship } from './relationship.schema';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: 'Actor', required: true },
      name: { type: String, required: true },
    },
    required: true,
  })
  actor_voice: {
    _id: Types.ObjectId;
    name: string;
  };

  @Prop()
  birthdate?: string;

  @Prop([String])
  ages?: string[];

  @Prop([String])
  other_names?: string[];

  @Prop()
  gender?: string;

  @Prop()
  status?: string;

  @Prop([String])
  occupations?: string[];

  @Prop([String])
  affiliations?: string[];

  @Prop({ type: [Relationship], default: [] })
  relationships?: Relationship[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Location', required: true },
        name: { type: String, required: true },
        description: { type: String }, // Solo vive en Character
      },
    ],
    default: [],
  })
  resides: {
    _id: Types.ObjectId;
    name: string;
    description?: string;
  }[];

  @Prop([String])
  height?: string[];

  @Prop()
  hair_color?: string;

  @Prop()
  eye_color?: string;

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Weapon' },
      name: String,
    },
  ])
  weapons?: {
    _id: Types.ObjectId;
    name: string;
  }[];

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Collectible' },
      name: String,
    },
  ])
  collectibles?: {
    _id: Types.ObjectId;
    name: string;
  }[];

  @Prop([String])
  appears?: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
