import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  providers: [AuthService, UtilsService],
  controllers: [AuthController],
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
  ]
})
export class AuthModule {}
