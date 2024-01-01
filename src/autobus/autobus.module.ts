import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autobus } from './entities/autobus.entity';
import { Seat } from './entities/seat.entity';
import { AutobusController } from './autobus.controller';
import { AutobusService } from './autobus.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Autobus, Seat])],
  providers: [AutobusService],
  controllers: [AutobusController]
})
export class AutobusModule {}
