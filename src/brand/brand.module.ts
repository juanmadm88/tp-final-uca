import { Global, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandController } from './brand.controller';
import { BrandMapper } from './mapper/brand.mapper';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandMapper],
  controllers: [BrandController]
})
export class BrandModule {}
