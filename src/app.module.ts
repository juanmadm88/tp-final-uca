import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './schemas/app.schema';
import { appConfig } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('appConfig.msyqlConnection.type'),
        host: configService.get<string>('appConfig.msyqlConnection.host'),
        port: configService.get<number>('appConfig.msyqlConnection.port'),
        username: configService.get<string>(
          'appConfig.msyqlConnection.username'
        ),
        password: configService.get<string>(
          'appConfig.msyqlConnection.password'
        ),
        database: configService.get<string>(
          'appConfig.msyqlConnection.database'
        ),
        synchronize: configService.get<boolean>(
          'appConfig.msyqlConnection.synchronize'
        ),
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
