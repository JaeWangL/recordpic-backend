import { Injectable, Logger } from '@nestjs/common';
import Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export default class LoggerService extends Logger {
  private readonly _logger: Winston.Logger;

  constructor() {
    super(LoggerService.name, true);
    this._logger = Winston.createLogger({
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${process.env.NODE_ENV}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: Winston.format.combine(Winston.format.timestamp(), Winston.format.json()),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${process.env.NODE_ENV}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: Winston.format.combine(Winston.format.timestamp(), Winston.format.json()),
        }),
        new Winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss',
            }),
            Winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    });

    if (process.env.NODE_ENV !== 'production') {
      this._logger.debug('Logging initialized at debug level');
    }
  }

  log(message: string): void {
    this._logger.info(message);
  }

  info(message: string): void {
    this._logger.info(message);
  }

  debug(message: string): void {
    this._logger.debug(message);
  }

  error(message: string, trace?: any, context?: string): void {
    this._logger.error(`${context || ''} ${message} -> (${trace || 'trace not provided !'})`);
  }

  warn(message: string): void {
    this._logger.warn(message);
  }
}
