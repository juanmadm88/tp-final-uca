import { Controller, Logger, Post, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Body, Get, Query } from '@nestjs/common';
import { ModelService } from './model.service';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { ModelDTO } from './dtos/model.dto';
@ApiTags('Model')
@Controller('model')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class ModelController {
  private logger = new Logger(ModelController.name);
  constructor(private service: ModelService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create a new Model' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Model has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create a new Model ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/')
  async create(@Body() dto: ModelDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.create(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create a new Model ',
        method: this.create.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find All Models ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Model has been found successfully.'
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
  @Get('/')
  async get(@Headers('unique-trace-id') uniqueTraceId: string, @Query('skip') skip?: number, @Query('size') size?: number) {
    try {
      return await this.service.findAll({ skip, take: size });
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get Model ',
        method: this.get.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
