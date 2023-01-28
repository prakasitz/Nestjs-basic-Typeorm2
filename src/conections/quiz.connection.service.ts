import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Quiz } from '../entity/quize.entity';
import { Pinsuay2 } from 'src/entity/pinsuay2.entity';

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
            connectionTimeout: 5000,
            requestTimeout: 5000,
            retryAttempts: 1,
            pool: {
                max: 70000,
                min: 1,
                acquireTimeoutMillis: 5000,
            },
            extra: {
                trustServerCertificate: true,
            },
            options: {
                tdsVersion: '7_4',
                cancelTimeout: 5000,
            },
            maxQueryExecutionTime: 5000,
            entities: [Quiz, Pinsuay2],
        };
    }
}
