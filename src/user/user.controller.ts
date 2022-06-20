import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)  // This means anything u want to access in the user controller will require your access token or authentication data
@Controller('user')
export class UserController {
   
    @Get('me')
    getMe(
        @GetUser() user: User,
        @GetUser('email') email: string,
    ){
        console.log({
            email,
        })
       
        return user;
    }
}

