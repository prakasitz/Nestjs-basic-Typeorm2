import { Inject, Injectable, UseFilters  } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationError } from "class-validator";
import { Model } from "mongoose";
import { AppService } from "src/app.service";
// import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/CreateUser.dto";
import { IUser } from "./IUser";
import { User as UserMongoose, UserDocument, UserSchema  as UserSchemaMongoose} from './schemas/user.mongoose.schema';


@Injectable() 
export class UserService {
    constructor(
        @InjectModel(UserMongoose.name, 'userMongoose') 
        private userRepository: Model<UserDocument>,

    // @InjectRepository(User, 'userConnection') 
    // private userRepository: Repository<User>,

    ) {
    }


    async getAllUser() {
        return this.userRepository.find().exec();
    }

    async createNewUser(user: createUserDto) {
        try {
            const createdUser = new this.userRepository(user);
            await createdUser.save();
            return "hello1"
        } catch (err) {
            console.log(err)
            return {
                error: err.message
            }
        }

        //return await this.userRepository.save();
    }


}