import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { Model } from 'mongoose';
import { AppService } from 'src/app.service';
import { User } from 'src/entity/user.entity';
import { DataSource, ObjectID, Repository } from 'typeorm';
import { createUserDto, hobby, hobbyUpdate } from './dto/CreateUser.dto';
import { IUser } from './IUser';
// import { User, User as UserMongoose, UserDocument, UserSchema  as UserSchemaMongoose} from './schemas/user.mongoose.schema';
import { ObjectId } from 'mongodb';
import { Hobby } from './schemas/hobby.schema';
import { Hobbys } from 'src/entity/Hobby.model';

@Injectable()
export class UserService {
    constructor(
        // @InjectModel(UserMongoose.name, 'userMongoose')
        // private userRepository: Model<UserDocument>,

        @InjectRepository(User, 'userConnection')
        private userRepository: Repository<User>,

        @InjectDataSource('userConnection')
        private testDb: DataSource,
    ) {}

    async getAllUser() {
        return this.userRepository.find();
    }

    async updateHobbys({ userId, hobbys }: hobbyUpdate) {
        let income_new_arr = [];
        let income_exsit_arr = [];
        hobbys.forEach((item) => {
            if (!item.id) {
                income_new_arr.push({
                    id: new ObjectId(),
                    createDate: new Date(),
                    ...item,
                });
            } else {
                income_exsit_arr.push(item);
            }
        });

        const query: object = { _id: new ObjectId(userId) };

        console.log('income_new_arr', income_new_arr);
        console.log('income_exsit_arr', income_exsit_arr);

        const usersRepository = this.testDb.getMongoRepository(User);
        const target = await usersRepository.findOneBy(query);

        console.log('data: before', target.hobbys);

        target.hobbys.forEach((item) => {
            income_exsit_arr.forEach((el) => {
                if (item.id != el.id) return;
                if (item.name != el.name || item.frequency != el.frequency) {
                    item.name = el.name;
                    item.frequency = el.frequency;
                    item.updateDate = new Date();
                }
            });
        });

        console.log('data: after updated', target.hobbys);
        console.log('------end check--------');

        let options = {
            projection: {
                hobbys: 1,
            },
            returnDocument: 'after',
        };

        const resultOfPush = await usersRepository.findOneAndUpdate(
            query,
            {
                $set: {
                    hobbys: target.hobbys,
                },
            },
            options,
        );

        const resultOfUpdated = await usersRepository.findOneAndUpdate(
            query,
            {
                $push: {
                    hobbys: { $each: [...income_new_arr] },
                },
            },
            options,
        );
        console.log('-------------------');
        console.log('resultOfPush', resultOfPush.value);
        console.log('resultOfUpdated', resultOfUpdated.value);
        console.log('-------------------');
        
        return resultOfUpdated.value;
    }

    async createNewUser(user: any) {
        try {
            const createdUser = this.userRepository.save(user);
            return createdUser;
        } catch (err) {
            console.log(err);
            return {
                error: err.message,
            };
        }

        //return await this.userRepository.save();
    }
}
