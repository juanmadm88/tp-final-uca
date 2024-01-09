import { Global, Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
@Global()
@Module({
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
