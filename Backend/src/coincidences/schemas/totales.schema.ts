import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type TotalesDocument = Totales & Document;

@Schema()
export class Totales {
  @Prop({ default: 0 })
  num_danger_totales: number;
  @Prop({ default: 0 })
  num_warn_totales: number;
  @Prop({ default: 0 })
  num_info_totales: number;
  @Prop({ default: 0 })
  num_safe_totales: number;
  
}

export const TotalesSchema = SchemaFactory.createForClass(Totales);
