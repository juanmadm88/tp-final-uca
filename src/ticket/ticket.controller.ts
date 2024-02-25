import { Controller, Logger, Post, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Body, Param, Patch, Get, Query, UseInterceptors } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { TicketDTO } from './dtos/ticket.dto';
import { UpdateTicketDTO } from './dtos/update-ticket.dto';
import { FindManyOptions } from 'typeorm';
import { QueryParamsTicket } from '../constants/common';
import { TicketsDTO } from './dtos/tickets.dto';
import { VerifyDuplicatedSeatInterceptor } from './interceptor/verify-duplicated-seat.interceptor';

@ApiTags('Ticket')
@Controller('ticket')
@UseGuards(AuthGuard)
@UseInterceptors(VerifyDuplicatedSeatInterceptor)
@UseFilters(HttpExceptionFilter)
export class TicketController {
  private logger = new Logger(TicketController.name);
  constructor(private service: TicketService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create a new Ticket' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Ticket has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create a new Ticket ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/')
  async create(@Body() dto: TicketDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.create(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create a new Ticket ',
        method: this.create.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update a Ticket' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Ticket has been successfully updated.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to update a Ticket',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiParam({
    name: 'id',
    description: 'Ticket id to be updated',
    required: true
  })
  @Patch('/:id')
  async update(@Body() dto: UpdateTicketDTO, @Headers('unique-trace-id') uniqueTraceId: string, @Param('id') id: number) {
    try {
      await this.service.update(id, dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Update a Ticket ',
        method: this.update.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find Tickets ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Tickets have been found successfully.'
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
    description: 'Number of Tickets to be skipped '
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
    description: 'Number of Tickets to be returned '
  })
  @ApiQuery({
    name: 'tripDestinationDescription',
    type: 'string',
    required: false,
    description: 'Destination description of the Trip '
  })
  @ApiQuery({
    name: 'tripOriginDescription',
    type: 'string',
    required: false,
    description: 'Origin description of the Trip '
  })
  @ApiQuery({
    name: 'tripDepartureDate',
    type: 'string',
    required: false,
    description: 'Departure date of the Trip '
  })
  @ApiQuery({
    name: 'userDescription',
    type: 'string',
    required: false,
    description: 'User who booked the ticket '
  })
  @ApiQuery({
    name: 'cancelled',
    type: 'string',
    required: false,
    description: 'Indicates whether the Ticket is cancelled or not '
  })
  @ApiQuery({
    name: 'serviceTypeDescription',
    type: 'string',
    required: false,
    description: 'Service Type description '
  })
  @ApiQuery({
    name: 'tripArrivalDate',
    type: 'string',
    required: false,
    description: 'Trip Arrival Date'
  })
  @Get('/')
  async get(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParamsTicket) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.findAll(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to get Tickets ',
        method: this.get.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @ApiOperation({ summary: 'Bulk Create Tickets' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Tickets have been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create new Tickets ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/bulk')
  async bulkCreate(@Body() dto: TicketsDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.bulkCreate(dto.getTickets());
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create new Tickets ',
        method: this.bulkCreate.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
