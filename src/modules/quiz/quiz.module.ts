import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entity/quize.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quize.service';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz], 'quizConnection')],
    controllers: [QuizController],
    providers: [QuizService],
})
export class QuizModule {}
