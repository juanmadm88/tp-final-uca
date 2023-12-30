import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [AuthService, UtilsService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
