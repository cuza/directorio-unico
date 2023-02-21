import { Module } from '@nestjs/common';
import { CoincidencesService } from './coincidences.service';
import { CoincidencesController } from './coincidences.controller';
import { Coincidence, CoincidenceSchema } from './schemas/coincidence.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Fecha, FechaSchema } from './schemas/fecha.schema';
import { Totales, TotalesSchema } from './schemas/totales.schema';
import { Data_coleccion, Data_coleccionSchema } from './schemas/arr_data.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Coincidence.name, schema: CoincidenceSchema },
      { name: Fecha.name, schema: FechaSchema },
      { name: Totales.name, schema: TotalesSchema },
      { name: Data_coleccion.name, schema: Data_coleccionSchema },
    ]),
  ],
  controllers: [CoincidencesController],
  providers: [CoincidencesService],
})
export class CoincidencesModule {}
