import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoincidencesModule } from './coincidences/coincidences.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    CoincidencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
