import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

    @Inject(ConfigService)
    public  config: ConfigService;

    getHello(): string {
        const databaseName: string = this.config.get('DB_QUIZ_HOST');
        console.log({ databaseName });
        return 'Hello World!';
    }
}
