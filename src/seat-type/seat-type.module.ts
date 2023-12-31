import { Global, Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatType } from './entities/seat-type.entity';
import { SeatTypeController } from './seat-type.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SeatType])],
  providers: [SeatTypeService],
  controllers: [SeatTypeController]
})
export class SeatTypeModule {}
