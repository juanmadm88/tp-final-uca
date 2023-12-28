import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import * as displayRoutes from 'express-routemap';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function initFastify(): Promise<NestFastifyApplication> {
  const loggerService = new LoggerService();
  const isFastifyLogger: boolean = process.env.FASTIFY_FM_LOGGER === 'enabled';
  const configFastify = { logger: isFastifyLogger };
  return NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(configFastify), {
    logger: WinstonModule.createLogger(loggerService.createLoggerConfig)
  });
}

async function initExpress(): Promise<NestExpressApplication> {
  const loggerService = new LoggerService();
  return NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(loggerService.createLoggerConfig)
  });
}

/**
 * Se deja elegir fastify o express como FM vars de entorno
 */
async function bootstrap() {
  const isFastify: boolean = process.env.FASTIFY_FM_HTTP === 'enabled';

  const app = await (isFastify ? initFastify() : initExpress());

  const config = new DocumentBuilder().setTitle('Transport example').setDescription('The Transport API description').setVersion('1.0').addTag('Transport').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  const appPort: number = isFastify ? configService.get<number>('appConfig.fastify_port') : configService.get<number>('appConfig.express_port');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: configService.get<string>('appConfig.env')?.toUpperCase() == 'PROD' ? true : false
    })
  );

  const rabbitConfig: object = configService.get<object>('appConfig.rabbitConfig');
  app.connectMicroservice(rabbitConfig);
  await app.startAllMicroservices();
  await app.listen(appPort, async () => {
    /* eslint-disable */
    console.log(`\x1b[33m starting  the microservice [ ${configService.get('appConfig.app_name')} ]. at ${Date().toString()}`);
    console.log(`\x1b[34m listening on port ${appPort}`);
    console.log(`\x1b[32m running environment NODE_ENV=${configService.get('appConfig.env')}`);
    const server = app.getHttpServer();
    const router = server._events.request._router;
    displayRoutes(router);
    /* eslint-enable */
  });
}
bootstrap();
