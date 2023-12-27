import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Logger,
  Headers
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from '../user/dtos';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Jwt } from './common';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Sign up a new User' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been successfully created.'
  })
  @Post('sign-up')
  async signUp(
    @Body() dto: UserDTO,
    @Headers('unique-trace-id') uniqueTraceId: string
  ) {
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
      throw error;
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
  @Post('login')
  async login(
    @Body() dto: LoginDTO,
    @Headers('unique-trace-id') uniqueTraceId: string
  ): Promise<Jwt> {
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
      throw error;
    }
  }
}
