import { Injectable  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/entity/quize.entity";
import { Repository } from "typeorm";
import { createQuizDto } from "./dto/CreateQuiz.dto";

@Injectable() 
export class QuizService {
    constructor(
        @InjectRepository(Quiz, 'quizConnection') 
        private quizRepository: Repository<Quiz>,
    ) {}


    getAllQuiz() {
        return this.quizRepository.find();
    }

    async createNewQuiz(quiz: createQuizDto) {
        return await this.quizRepository.save(quiz);
    }
}