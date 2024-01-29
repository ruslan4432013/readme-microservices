import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const statusText = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    const data = error.response?.data;
    if (data) {
      response
        .status(status)
        .json(data);
      return;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        error: statusText
      });
  }
}
