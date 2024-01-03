import { Global, Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { TripController } from './trip.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripService],
  controllers: [TripController]
})
export class TripModule {}
