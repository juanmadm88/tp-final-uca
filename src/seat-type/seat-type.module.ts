import { Global, Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatType } from './entities/seat-type.entity';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeMapper } from './mapper/seat-type.mapper';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SeatType])],
  providers: [SeatTypeService, SeatTypeMapper],
  controllers: [SeatTypeController]
})
export class SeatTypeModule {}
