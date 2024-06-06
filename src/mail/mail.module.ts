import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('appConfig.mailSender.host'),
          secure: false,
          port: configService.get<number>('appConfig.mailSender.port'),
          auth: {
            user: configService.get<string>('appConfig.mailSender.userName'),
            pass: configService.get<string>('appConfig.mailSender.password')
          }
        }
      })
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
