import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ summary: 'Checks Api Health Status' })
  @ApiTags('Health')
  @Get('/health')
  getHealth(): any {
    return this.appService.getHealth();
  }
}
