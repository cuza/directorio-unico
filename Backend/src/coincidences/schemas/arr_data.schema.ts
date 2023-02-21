import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type Data_coleccionDocument = Data_coleccion & Document;

@Schema()
export class Data_coleccion {
  @Prop({ default: "" })
  identidad: string ;
  @Prop({ default: "" })
  nombre: string;
  @Prop({ default: "" })
  apellidos: string ;
  @Prop({ default: "" })
  pais: string ;
  @Prop({ default: "" })
   provincia: string;
   @Prop({ default: "" })
   municipio: string ;
   @Prop({ default: "" })
   situacion_academica: string;
   @Prop({ default: "" })
   tipo_de_curso: string;
   @Prop({ default: "" })
   estado:string ;
   @Prop({ default: "" })
   direccion: string ;
   @Prop({ default: "" })
   fecha_de_nacimiento: string;
   @Prop({ default: "" })
   regimen_de_estudio : string;
   @Prop({ default: "" })
   sexo:string ;
   @Prop({ default: "" })
   tipo_de_estudiante: string ;
   @Prop({ default: "" })
   ano_de_estudio: string;
   @Prop({ default: 0 })
   edad:string ;
   @Prop({ default: 0 })
   referencia: string ;
   @Prop({ default: "" })
   situacion: string ;
   @Prop({ default: 0 })
   cantidad: string;
   @Prop()
   coincidencias: [];
}
export const Data_coleccionSchema = SchemaFactory.createForClass(Data_coleccion);
