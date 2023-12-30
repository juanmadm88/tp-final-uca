import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsService } from '../utils/utils.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('appConfig.token.secret'),
        signOptions: {
          expiresIn: configService.get<string>('appConfig.token.expiration')
        }
      })
    })
  ],
  providers: [AuthService, UtilsService],
  exports: [JwtModule],
  controllers: [AuthController]
})
export class AuthModule {}
