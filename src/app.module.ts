import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './schemas/app.schema';
import { appConfig } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { VerifyRoleMiddleware } from './middlewares/verify-role.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GenerateTraceIdInterceptor } from './interceptor/generate-trace-id.interceptor';

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
        username: configService.get<string>('appConfig.msyqlConnection.username'),
        password: configService.get<string>('appConfig.msyqlConnection.password'),
        database: configService.get<string>('appConfig.msyqlConnection.database'),
        synchronize: configService.get<boolean>('appConfig.msyqlConnection.synchronize'),
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
    UtilsModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GenerateTraceIdInterceptor
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRoleMiddleware).exclude('/auth/*');
  }
}
