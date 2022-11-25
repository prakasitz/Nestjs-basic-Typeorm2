import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuizConnectionService } from './conections/quiz.connection.service';
import { UserConnectionService } from './conections/user.connection.service';
import { DataSource } from 'typeorm';
import { APP_FILTER, NestApplication } from '@nestjs/core';
import { Logger as NestLogger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongooseService } from './conections/user.mongoose.service';
import {testFilterException } from './exceptions/all-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: QuizConnectionService,
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
            name: 'quizConnection'
        }),
        // TypeOrmModule.forRootAsync({
        //     useClass: UserConnectionService,
        //     dataSourceFactory: async (options) => {
        //         const dataSource = await new DataSource(options).initialize();
        //         return dataSource;
        //     },
        //     name: "userConnection"
        // }),
        MongooseModule.forRootAsync({
            useClass: UserMongooseService,
            connectionName: "userMongoose",
        }),
        QuizModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_FILTER,
        //     useClass:testFilterException,
        // }
    ],
})
export class AppModule {
    public async hello(options) {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
    }
}

