import { Injectable  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable() 
export class UserService {
    constructor(
        @InjectRepository(User, 'userConnection') 
        private userRepository: Repository<User>,
    ) {
    }


    async getAllUser() {
        return this.userRepository.find();
    }


}