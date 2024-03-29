import { Controller, Logger, Post, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Body, Patch, Param, Get, Query } from '@nestjs/common';
import { AutobusService } from './autobus.service';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { AutoBusDTO } from './dtos/autobus.dto';
import { UpdateAutoBusDTO } from './dtos/update-autobus.dto';
import { FindManyOptions } from 'typeorm';
import { QueryParams } from '../constants/common';
@ApiTags('Autobus')
@Controller('autobus')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class AutobusController {
  private logger = new Logger(AutobusController.name);
  constructor(private service: AutobusService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create a new Autobus ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Autobus has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create a new Autobus ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/')
  async create(@Body() dto: AutoBusDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.create(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create a new AutoBus ',
        method: this.create.name,
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
    description: 'The Autobus has been successfully updated.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to update an Autobus',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @ApiParam({
    name: 'id',
    description: 'Autobus id to be updated',
    required: true
  })
  @Patch('/:id')
  async update(@Body() dto: UpdateAutoBusDTO, @Headers('unique-trace-id') uniqueTraceId: string, @Param('id') id: number) {
    try {
      await this.service.update(id, dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Update an AutoBus ',
        method: this.update.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find All Autobuses ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Autobuses have been found successfully.'
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
    description: 'Number of Autobuses to be skipped '
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
    description: 'Number of Autobuses to be returned '
  })
  @ApiQuery({
    name: 'description',
    type: 'string',
    required: false,
    description: 'Description of the Autobus '
  })
  @Get('/')
  async get(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.findAll(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to get Autobuses ',
        method: this.get.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find An Autobus by Id ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Autobus has been found successfully.'
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
    description: 'Autobus id ',
    required: true
  })
  @Get('/:id')
  async getById(@Headers('unique-trace-id') uniqueTraceId: string, @Param('id') id: number) {
    try {
      return await this.service.findById(id);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to get an Autobus ',
        method: this.getById.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
