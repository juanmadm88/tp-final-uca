import { Controller, Logger, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { FindManyOptions } from 'typeorm';
import { QueryParams } from '../constants/common';
import { ReportService } from './report.service';
@ApiTags('Report')
@Controller('report')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class ReportController {
  private logger = new Logger(ReportController.name);
  constructor(private service: ReportService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find All Records ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Records has been found successfully.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiQuery({
    name: 'skip',
    type: 'number',
    required: false,
    description: 'Number of Records to be skipped '
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
    description: 'Number of Records to be returned '
  })
  @ApiQuery({
    name: 'autobusIsAsigned',
    type: 'number',
    required: false,
    description: 'Choose betweeen Autobus/es asigned to trips or not '
  })
  @ApiQuery({
    name: 'ticketCancelled',
    type: 'number',
    required: false,
    description: 'Choose betweeen Ticket/s cancelled or not '
  })
  @Get('/autobus/kmTravelled')
  async getKmTravelled(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.getKmTravelled(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get Records ',
        method: this.getKmTravelled.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Number of Tickets Sold ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfully Executed.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiQuery({
    name: 'ticketCancelled',
    type: 'number',
    required: false,
    description: 'Choose betweeen Tickets cancelled or not '
  })
  @ApiQuery({
    name: 'tripFinished',
    type: 'number',
    required: false,
    description: 'Choose betweeen Trips finished or not '
  })
  @Get('/tickets/sold')
  async getTicketSold(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.getTicketSold(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get The Number of Tickets Sold ',
        method: this.getTicketSold.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Billing' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfully Executed.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiQuery({
    name: 'ticketCancelled',
    type: 'number',
    required: false,
    description: 'Choose betweeen Tickets cancelled or not '
  })
  @ApiQuery({
    name: 'tripFinished',
    type: 'number',
    required: false,
    description: 'Choose betweeen Trips finished or not '
  })
  @Get('/billing')
  async getBilling(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.getBilling(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get Billing',
        method: this.getBilling.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Number of People Transported' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfully Executed.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiQuery({
    name: 'ticketCancelled',
    type: 'number',
    required: false,
    description: 'Choose betweeen Tickets cancelled or not '
  })
  @ApiQuery({
    name: 'tripFinished',
    type: 'number',
    required: false,
    description: 'Choose betweeen Trips finished or not '
  })
  @Get('/people/transported')
  async getPeopleTransported(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.getPeopleTransported(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get People Transported',
        method: this.getPeopleTransported.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Number of Trips' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfully Executed.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiQuery({
    name: 'ticketCancelled',
    type: 'number',
    required: false,
    description: 'Choose betweeen Tickets cancelled or not '
  })
  @ApiQuery({
    name: 'tripFinished',
    type: 'number',
    required: false,
    description: 'Choose betweeen Trips finished or not '
  })
  @Get('/trips')
  async getTrips(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.getNumberOfTrips(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get Trips ',
        method: this.getTrips.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
