import { Body, Controller, Post, HttpCode, HttpStatus, Logger, Headers, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from '../user/dtos';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiHeader } from '@nestjs/swagger';
import { Jwt } from './common';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UtilsService } from '../utils/utils.service';
@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService, private utilsService: UtilsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Sign up a new User' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been successfully created.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @Post('sign-up')
  async signUp(@Body() dto: UserDTO, @Headers('unique-trace-id') uniqueTraceId: string) {
    try {
      await this.authService.signUp(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to log',
        method: 'sign-up',
        err: error,
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User Login' })
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been logged successfully.'
  })
  @ApiHeader({
    name: 'unique-trace-id',
    description: 'Autogenerated trace id',
    required: false
  })
  @Post('login')
  async login(@Body() dto: LoginDTO, @Headers('unique-trace-id') uniqueTraceId: string): Promise<Jwt> {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to log',
        err: error,
        method: 'login',
        'unique-trace-id': uniqueTraceId
      });
      this.utilsService.throwInternalServerIfErrorIsNotHttpExcetion(error);
    }
  }
}
