import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop([String])
  other_names?: string[];

  @Prop([String])
  group_type?: string[];

  @Prop()
  founded?: string;

  @Prop({
    type: {
      locations: {
        type: [
          {
            _id: { type: Types.ObjectId, ref: 'Location', required: true },
            name: { type: String, required: true },
            state: { type: String, required: true },
            description: { type: String },
          },
        ],
      },
      notes: { type: [String], _id: false },
    },
    _id: false,
    default: { locations: [], notes: [] },
  })
  headquarters: {
    locations: {
      _id: Types.ObjectId;
      name: string;
      state: string;
      description?: string;
    }[];
    notes: string[];
  };

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Location', required: true },
        name: { type: String, required: true },
        state: { type: String, required: true },
        description: { type: String },
      },
    ],
    default: [],
  })
  locations: {
    _id: Types.ObjectId;
    name: string;
    state: string;
    description?: string;
  }[];

  @Prop({
    type: {
      characters: {
        type: [
          {
            _id: { type: Types.ObjectId, ref: 'Character', required: true },
            name: { type: String, required: true },
            description: { type: String },
          },
        ],
      },
      notes: { type: [String], _id: false },
    },
    _id: false,
    default: { characters: [], notes: [] },
  })
  leaders: {
    characters: {
      _id: Types.ObjectId;
      name: string;
      description?: string;
    }[];
    notes: string[];
  };

  @Prop({
    type: {
      characters: {
        type: [
          {
            _id: { type: Types.ObjectId, ref: 'Character', required: true },
            name: { type: String, required: true },
            description: { type: String },
          },
        ],
      },
      notes: { type: [String], _id: false },
    },
    _id: false,
    default: { characters: [], notes: [] },
  })
  members: {
    characters: {
      _id: Types.ObjectId;
      name: string;
      description?: string;
    }[];
    notes: string[];
  };

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Group' },
        name: { type: String },
      },
    ],
    default: [],
  })
  allies?: {
    _id: Types.ObjectId;
    name: string;
  }[];

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: 'Group' },
        name: { type: String },
      },
    ],
    default: [],
  })
  enemies?: {
    _id: Types.ObjectId;
    name: string;
  }[];

  @Prop([String])
  appears?: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
