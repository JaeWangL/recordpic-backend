import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import LoggerService from '@shared/logger/logger.service';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    if (request) {
      const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse = {
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        error: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.message || null : 'Internal server error',
        message:
          typeof exception.getResponse() === 'object'
            ? (exception.getResponse() as any).message
            : exception.getResponse(),
      };

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter');
      } else {
        this.logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');
      }

      return response.status(status).send(errorResponse);
    }

    return exception;
  }
}
