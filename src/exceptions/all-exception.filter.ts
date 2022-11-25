import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { MongooseError } from 'mongoose';
import { MissingDriverError, MongoCallback, MongoError } from 'typeorm';
  
  @Catch()
  export class testFilterException implements ExceptionFilter {

    constructor(private adapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.adapterHost;
  
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      
    }
  }
  