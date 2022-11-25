import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { AppModule } from 'src/app.module';
// import { User } from 'src/entity/user.entity';
import { User as UserMongoose, UserSchema  as UserSchemaMongoose} from './schemas/user.mongoose.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [
        MongooseModule.forFeature([{name: UserMongoose.name, schema: UserSchemaMongoose}], 'userMongoose'),
        //TypeOrmModule.forFeature([UserSchema], 'userConnection')    
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
