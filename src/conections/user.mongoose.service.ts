import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";
import { User } from "src/entity/user.entity";

@Injectable()
export class UserMongooseService implements MongooseOptionsFactory {

    @Inject(ConfigService)
    public configService: ConfigService;

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: 'mongodb://'+this.configService.get("DB_USER_HOST")+':'+Number(this.configService.get("DB_USER_PORT")),
            dbName: this.configService.get("DB_USER_DATABASE"), 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // logging: true,
        };
    }
}