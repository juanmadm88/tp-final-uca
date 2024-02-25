import { Controller, Logger, Post, UseFilters, UseGuards, Headers, HttpCode, HttpStatus, Body, Get, Query } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { TerminalDTO } from './dtos/terminal.dto';
import { QueryParams } from '../constants/common';
import { FindManyOptions } from 'typeorm';
@ApiTags('Terminal')
@Controller('terminal')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class TerminalController {
  private logger = new Logger(TerminalController.name);
  constructor(private service: TerminalService, private utilsService: UtilsService) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create a new Terminal' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Terminal has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @ApiHeader({
    name: 'user_role',
    description: 'User role allowed to create a new Terminal ',
    required: true
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true
  })
  @Post('/')
  async create(@Body() dto: TerminalDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.service.create(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Create a new Terminal ',
        method: this.create.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find All Terminals ' })
  @ApiInternalServerErrorResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Terminal has been found successfully.'
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
  async get(@Headers('unique-trace-id') uniqueTraceId: string, @Query() params?: QueryParams) {
    try {
      const options: FindManyOptions = this.utilsService.buildOptions(params);
      return await this.service.findAll(options);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to Get Terminal ',
        method: this.get.name,
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
