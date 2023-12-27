import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from '../user/dtos';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-up')
  async signUp(@Body() dto: UserDTO) {
    try {
      await this.authService.signUp(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to log',
        method: 'sign-up',
        err: error
      });
      throw error;
    }
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to log',
        err: error,
        method: 'login'
      });
      throw error;
    }
  }
}
