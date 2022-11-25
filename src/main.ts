import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger as NestLogger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { testFilterException } from './exceptions/all-exception.filter';



async function bootstrap() {
    // NestLogger.error("hello")
    // NestLogger.error(JSON.stringify(process.env))
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });

    // const httpAdapter = app.get(HttpAdapterHost);
    // app.useGlobalFilters(new testFilterException(httpAdapter));

    app.enable('trust proxy');

    app.useGlobalPipes(new ValidationPipe()); // declare ValidationPipe in global
    app.enableCors(); //fro CORS (allow resources to be requested from another domain)

    await app.listen(3001, '0.0.0.0');

    return app.getUrl();
}

// bootstrap();
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        NestLogger.log(url, 'Bootstrap');
    } catch (error) {
        NestLogger.error(error, 'Bootstrap');
    console.log(process.env)
    }
})();
