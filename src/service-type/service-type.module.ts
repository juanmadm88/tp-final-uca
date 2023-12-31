import { Global, Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceType } from './entities/service-type.entity';
import { ServiceTypeController } from './service-type.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ServiceType])],
  providers: [ServiceTypeService],
  controllers: [ServiceTypeController]
})
export class ServiceTypeModule {}
