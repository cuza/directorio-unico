import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type FechaDocument = Fecha & Document;

@Schema()
export class Fecha {
  @Prop({ default:  '1996/10/08 12:00:00'})
  fecha: string;
}

export const FechaSchema = SchemaFactory.createForClass(Fecha);