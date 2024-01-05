import { Controller, Logger, Post, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Body, Param, Get, Patch, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { TripDTO } from './dtos/trip.dto';
import { UpdateTripDTO } from './dtos/update-trip.dto';
import { QueryParams } from './common';
import { FindManyOptions } from 'typeorm';
@ApiTags('Trip')
@Controller('trip')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class TripController {
  private logger = new Logger(TripController.name);
  constructor(private service: TripService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create a new Trip' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Trip has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create a new Trip ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/')
  async create(@Body() dto: TripDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.create(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create a new Trip ',
        method: this.create.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a Trip by Id ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Trip has been found successfully.'
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
  @ApiParam({
    name: 'id',
    description: 'Trip id ',
    required: true
  })
  @Get('/:id')
  async getById(@Headers('unique-trace-id') uniqueTraceId: string, @Param('id') id: number) {
    try {
      return await this.service.findById(id);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to get a Trip ',
        method: this.getById.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find Trips ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Trips have been found successfully.'
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
    description: 'Number of Trips to be skipped '
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
    description: 'Number of Trips to be returned '
  })
  @ApiQuery({
    name: 'destinationDescription',
    type: 'string',
    required: false,
    description: 'Destination description of the Trip '
  })
  @ApiQuery({
    name: 'originDescription',
    type: 'string',
    required: false,
    description: 'Origin description of the Trip '
  })
  @ApiQuery({
    name: 'departureDate',
    type: 'string',
    required: false,
    description: 'Departure date of the Trip '
  })
  @Get('/')
  async get(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params: QueryParams) {
    try {
      const options: FindManyOptions = this.buildOptions(params);
      return await this.service.findAll(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to get Trips ',
        method: this.get.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update an Autobus' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Trip has been successfully updated.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to update a Trip',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiParam({
    name: 'id',
    description: 'Trip id to be updated',
    required: true
  })
  @Patch('/:id')
  async update(@Body() dto: UpdateTripDTO, @Headers('unique-trace-id') uniqueTraceId: string, @Param('id') id: number) {
    try {
      await this.service.update(id, dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Update a Trip ',
        method: this.update.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  private buildOptions(args: QueryParams = {}): FindManyOptions {
    const result: FindManyOptions = {};
    let where: any = {};
    if (args.skip) result.skip = args.skip;
    if (args.size) result.take = args.size;
    if (args.originDescription) where = { originDescription: `%${args.originDescription}%` };
    if (args.destinationDescription) where = { ...where, destinationDescription: `%${args.destinationDescription}%` };
    if (args.departureDate) where = { ...where, departureDate: `%${args.departureDate}%` };
    if (Object.keys(where).length > 0) result.where = where;
    return result;
  }
}
