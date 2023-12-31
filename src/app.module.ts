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
import { ServiceTypeModule } from './service-type/service-type.module';
import { SeatTypeModule } from './seat-type/seat-type.module';
import { ServiceTypeController } from './service-type/service-type.controller';
import { SeatTypeController } from './seat-type/seat-type.controller';
import { BrandController } from './brand/brand.controller';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ModelController } from './model/model.controller';
import { TerminalController } from './terminal/terminal.controller';
import { TerminalModule } from './terminal/terminal.module';
import { AutobusModule } from './autobus/autobus.module';
import { AutobusController } from './autobus/autobus.controller';
import { TripModule } from './trip/trip.module';
import { TripController } from './trip/trip.controller';
import { TicketModule } from './ticket/ticket.module';
import { TicketController } from './ticket/ticket.controller';
import { ReportModule } from './report/report.module';
import { ReportController } from './report/report.controller';

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
        autoLoadEntities: true,
        logging: configService.get<boolean>('appConfig.msyqlConnection.allowLoggingQueries')
      }),
      inject: [ConfigService]
    }),
    UtilsModule,
    UserModule,
    AuthModule,
    ServiceTypeModule,
    SeatTypeModule,
    BrandModule,
    ModelModule,
    TerminalModule,
    AutobusModule,
    TripModule,
    TicketModule,
    ReportModule
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
    consumer.apply(VerifyRoleMiddleware).forRoutes(ServiceTypeController, SeatTypeController, BrandController, ModelController, TerminalController, AutobusController, TripController, TicketController, ReportController);
  }
}
