import { Inject, Injectable, UseFilters  } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from 'class-transformer';
import { ValidationError } from "class-validator";
import { Model } from "mongoose";
import { AppService } from "src/app.service";
import { User } from "src/entity/user.entity";
import { DataSource, ObjectID, Repository } from "typeorm";
import { createUserDto, hobby, hobbyUpdate } from "./dto/CreateUser.dto";
import { IUser } from "./IUser";
// import { User, User as UserMongoose, UserDocument, UserSchema  as UserSchemaMongoose} from './schemas/user.mongoose.schema';
import { ObjectId } from "mongodb";
import { Hobby } from "./schemas/hobby.schema";
import { Hobbys } from "src/entity/Hobby.model";


@Injectable() 
export class UserService {
    constructor(
        // @InjectModel(UserMongoose.name, 'userMongoose') 
        // private userRepository: Model<UserDocument>,
        

        @InjectRepository(User, 'userConnection') 
        private userRepository: Repository<User>,
        
        @InjectDataSource('userConnection') 
        private testDb: DataSource,


    ) {
    }


    async getAllUser() {
        return this.userRepository.find();
    }

    async updateHobbys({userId, hobbys}: hobbyUpdate) {
        let income_new_arr = hobbys.filter((item) => {
            if(!item.id) return item 
        })
        income_new_arr.map((item) => {
            item.id = new ObjectId()
            item.createDate = new Date()
        })

        let income_exsit_arr = hobbys.filter((item) => {
            if(item.id) return item 
        })
        
        const usersRepository = this.testDb.getMongoRepository(User)
        const target = await usersRepository.findOneBy({
            "_id": new ObjectId(userId)
        })

        console.log('1', target.hobbys)

        target.hobbys.forEach((item, index) => {
            income_exsit_arr.forEach((el) => {
                if(item.id != el.id) return;
                if(item.name != el.name ||
                    item.frequency != el.frequency) {
                    item.name = el.name
                    item.frequency = el.frequency
                    item.updateDate = new Date()
                }
            })
        })

        console.log('2', target.hobbys)
        console.log('------end check--------')


        let options = {
            projection: {
                "hobbys": 1
            },
            returnDocument: 'after',
        }

        const aa = await usersRepository.findOneAndUpdate({
            _id: new ObjectId(userId)
        },{
            $set: {
                "hobbys": target.hobbys
            }
        }, options)


        let query = {
            _id: new ObjectId(userId)
        }

        let updateObj = {
                $push: { 
                    "hobbys": {$each: [...income_new_arr]}
                },
            }

        const result = await usersRepository.findOneAndUpdate(query, updateObj, options)
        console.log(aa.value)
        console.log('-------------------')
        console.log(result.value)
        return result.value

    }

    async createNewUser(user: any) {
        try {
            const createdUser = this.userRepository.save(user);
            return createdUser
        } catch (err) {
            console.log(err)
            return {
                error: err.message
            }
        }

        //return await this.userRepository.save();
    }


}