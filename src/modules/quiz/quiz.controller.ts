import { BadRequestException, HttpCode, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import { createQuizDto } from './dto/CreateQuiz.dto';
import { QuizService } from './quize.service';

@Controller('quiz')
export class QuizController {
    constructor(private quizeService: QuizService) {}

    @Get('/')
    public getAllQuiz() {
        return this.quizeService.getAllQuiz();
    }

    @Get('/q') // http://localhost:3000/test/quiz/q?name=anything
    public helloQuery(@Query('name') name: string): string {
      if (!name) {
        throw new BadRequestException('InvalidParameter');
      }
  
      return `helloQuery: ${name}`;
    }

    @Get('ex/hello') // http://localhost:3000/quiz/hello //with express handle Req Response manual
    public hello(@Req() req: Request, @Res() res: Response): void {
        console.log(res)
        res.json({
            message: req.originalUrl,
        });
    }
  

    @Get('/:item')
    public getOnceItem(@Param('item') item: string): string {
        return `helloParam: ${item}`;
    }

    @Post('/create') //save in database1
    @HttpCode(200)
    public async createQuiz(@Body() quizData: createQuizDto) {
        return await this.quizeService.createNewQuiz(quizData);
    }
}
