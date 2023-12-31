import { Global, Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { ModelController } from './model.controller';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelService],
  controllers: [ModelController]
})
export class ModelModule {}
