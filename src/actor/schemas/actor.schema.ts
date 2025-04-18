import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// TODO: definir actor y toda la data que va a contener

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Actor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
