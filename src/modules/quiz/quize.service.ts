import { Injectable  } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/entity/quize.entity";
import { DataSource, Repository } from "typeorm";
import { createQuizDto } from "./dto/CreateQuiz.dto";

@Injectable() 
export class QuizService {
    constructor(
        @InjectRepository(Quiz, 'quizConnection') 
        private quizRepository: Repository<Quiz>,
        @InjectDataSource('quizConnection')
        private dbQuiz: DataSource
    ) {}


    async getAllQuiz() {
        const queryRunner = this.dbQuiz.createQueryRunner()
        await queryRunner.connect()

        await queryRunner.startTransaction()
        let result
        try {
            // execute some operations on this transaction:
            result = await queryRunner.manager.findOne(Quiz,  {order: })
            console.log('try1', result)
            result = await queryRunner.manager.save(Quiz, {
                "title": "helloasdasdasd aaddsd asss",
                "description": "this is detailss",
                "isActive": true
            })
            console.log(result)

            // if some line is error that will catching and rollback 
            // result = await queryRunner.query('select 0/0')
            throw new Error('12312')
            result = await queryRunner.manager.count(Quiz)
            console.log('try2', result)
            // commit transaction now:
            await queryRunner.commitTransaction()
        } catch (err) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction()
            result = await queryRunner.manager.count(Quiz)
            console.log('catch', result)
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release()
        }

        return result
    }

    async createNewQuiz(quiz: createQuizDto) {
        return await this.quizRepository.save(quiz);
    }
}