import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
export class LoggerService {
  dailyRotateFileTransport: any = null;
  myFormat: winston.Logform.Format = null;
  createLoggerConfig: winston.LoggerOptions = null;
  constructor() {
    this.dailyRotateFileTransport = new DailyRotateFile({
      filename: `logs/app_log-%DATE%.log`,
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d'
    });

    this.myFormat = winston.format.printf(({ level, message, timestamp, req, err, ...metadata }) => {
      const json: any = {
        timestamp,
        level,
        ...metadata,
        message
      };
      if (req) json.request = req;

      if (err) {
        json.error = err.stack || err;
      }

      const msg = JSON.stringify(json);
      return msg;
    });

    this.createLoggerConfig = {
      level: 'warn',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        this.myFormat
      ),

      transports: [new winston.transports.Console({ level: 'info' }), this.dailyRotateFileTransport]
    };
  }
}
