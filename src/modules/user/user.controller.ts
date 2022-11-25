import { BadRequestException, HttpCode, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import type { Request, Response } from 'express';
import internal from 'stream';
import { createUserDto, hobbyUpdate } from './dto/CreateUser.dto';
import { IUser } from './IUser';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    public async getAllUser() {
        return await this.userService.getAllUser();
    }

    @Post('/hobbys') //save in database1
    @UsePipes(new ValidationPipe({transform: true}))
    @HttpCode(200)
    public async updateHobbys(@Body() hobbyObj: hobbyUpdate) {
        console.log(hobbyObj)
        console.log('--------controller------')
        //return "hello"
       return await this.userService.updateHobbys(hobbyObj);
    }

    @Post('/create') //save in database1
    @HttpCode(200)
    public async createUser(@Body() userData: createUserDto) {
        //return "hello"
       return await this.userService.createNewUser(userData);
    }
}