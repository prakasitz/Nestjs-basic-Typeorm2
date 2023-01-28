import { BadRequestException, HttpCode, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

import { createQuizDto } from './dto/CreateQuiz.dto';
import { QuizService } from './quize.service';
import { FileInterceptor } from '@nestjs/platform-express';

import * as XLSX from 'xlsx'

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


    @Post('/bulk')
    async bulk() {
        return this.quizeService.createBulkQuiz2()
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('LeaveConfigFile'))
    async uploadFile(
        @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1000 *  1000 * 20 }), //20MB
                new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
            ],
          })
    ) file: Express.Multer.File) {
        console.time('uploadFileController')
        const workbook = XLSX.read(file.buffer, {type: "buffer", cellDates: true})
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"], {
            raw: true,
            header: 0
        })
        const a = await this.quizeService.createBulkQuiz1(excelData)
        console.timeEnd('uploadFileController')
      return {
        messageStatus: a == 1 ? a : 0,
        messageDescription: a == 1 ?  `Uploaded row: ${excelData.length}` : 'Error on Executing'
      }
    }
}
