import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export type CoincidenceDocument = Coincidence & Document;

@Schema()
export class Coincidence {
  @Prop({ default: null })
  name_facultad: string;
  @Prop({ default: null })
  num_danger: number;
  @Prop({ default: null })
  num_warn: number;
  @Prop({ default: null })
  num_info: number;
  @Prop({ default: null })
  num_safe: number;
  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: [
      {
        name_carrera: '',
        num_danger: 0,
        num_warn: 0,
        num_info: 0,
        num_safe: 0,
      },
    ],
  })
  carrera: [
     {
      name_carrera: string | ' ';
      num_danger: number | 0;
      num_warn: number | 0;
      num_info: number | 0;
      num_safe: number | 0;
    
    
      modalidad: [
        {
          name_modalidad: string | ' ';
          num_danger: number | 0;
          num_warn: number | 0;
          num_info: number | 0;
          num_safe: number | 0;
        casos: [
            {
              identidad: string | ' ';
              nombre: string | ' ';
              apellidos: string | ' ';
              pais: string | ' ';
              provincia: string | ' ';
              municipio: string | ' ';
              situacion_academica: string | ' ';
              estado: string | ' ';
              situacion: string | ' ';
              direccion: string | ' ';
              fecha_de_nacimiento: string | ' ';
              grupo: string | ' ';
              regimen_de_estudio: string | ' ';
              sexo: string | ' ';
              tipo_de_estudiante: string | ' ';
              ano_de_estudio: string | ' ';
              edad: number | 0;
              referencia: number | 0;
              cantidad: number | 0;
              coincidencias: [
                {
                  identidad: string | ' ';
                  nombre: string | ' ';
                  apellidos: string | ' ';
                  pais: string | ' ';
                  provincia: string | ' ';
                  municipio: string | ' ';
                  situacion_academica: string | ' ';
                  estado: string | ' ';
                  direccion: string | ' ';
                  fecha_de_nacimiento: string | ' ';
                  grupo: string | ' ';
                  carrera: string | ' ';
                  facultad_filial: string | ' ';
                  tipo_de_curso: string | ' ';
                  regimen_de_estudio: string | ' ';
                  sexo: string | ' ';
                  tipo_de_estudiante: string | ' ';
                  ano_de_estudio: string | ' ';
                  edad: number | 0;
                },
              ];
            },
          ];
        },
      ];
    }, 
  ];
}

export const CoincidenceSchema = SchemaFactory.createForClass(Coincidence);
