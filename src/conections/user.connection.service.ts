import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";

@Injectable()
export class UserConnectionService implements TypeOrmOptionsFactory {

    @Inject(ConfigService)
    public configService: ConfigService;

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mongodb",
            host: this.configService.get("DB_USER_HOST"), 
            port: Number(this.configService.get("DB_USER_PORT")), 
            database: this.configService.get("DB_USER_DATABASE"), 
            poolSize: 1000,
            connectTimeoutMS: 30000,
            synchronize: false,
            logging: true,
            useUnifiedTopology: true,
            entities: [User],
        };
    }
}