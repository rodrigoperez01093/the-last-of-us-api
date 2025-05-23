import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false }) // evita que Mongoose cree un _id para cada relación
export class Relationship {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;
}
