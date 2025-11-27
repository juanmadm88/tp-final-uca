import { Global, Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { TripController } from './trip.controller';
import { TripMapper } from './mapper/trip.mapper';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripService, TripMapper],
  controllers: [TripController]
})
export class TripModule {}
