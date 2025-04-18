import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Character extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  is_enemy: boolean;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: String,
    },
    required: true,
  })
  faction: {
    _id: Types.ObjectId;
    name: string;
  };

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: String,
      lastname: String,
    },
    required: true,
  })
  actor: {
    _id: Types.ObjectId;
    name: string;
    lastname: string;
  };

  //   @Prop([
  //     {
  //       _id: { type: Types.ObjectId, required: true },
  //     },
  //   ])
  //   weapons: {
  //     _id: Types.ObjectId;
  //   }[];

  //   @Prop([
  //     {
  //       _id: { type: Types.ObjectId, required: true },
  //     },
  //   ])
  //   collectibles: {
  //     _id: Types.ObjectId;
  //   }[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
