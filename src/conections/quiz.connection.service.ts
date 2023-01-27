import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Quiz } from '../entity/quize.entity';

@Injectable()
export class QuizConnectionService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    public configService: ConfigService;

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: this.configService.get('DB_QUIZ_HOST'),
            port: Number(this.configService.get('DB_QUIZ_PORT')),
            username: this.configService.get('DB_QUIZ_USERNAME'),
            password: this.configService.get('DB_QUIZ_PASSWORD'),
            database: this.configService.get('DB_QUIZ_DATABASE'),
            synchronize: false,
            connectionTimeout: 1000,
            requestTimeout: 1000,
            retryAttempts: 1,
            pool: {
                max: 100,
                min: 1,
                acquireTimeoutMillis: 1000,
            },
            extra: {
                trustServerCertificate: true,
            },
            options: {
                tdsVersion: '7_4',
                cancelTimeout: 1000,
            },
            maxQueryExecutionTime: 1000,
            entities: [Quiz],
        };
    }
}
