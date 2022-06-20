import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { EphemeralKeyInfo } from "tls";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')

export class AuthController {
    constructor(private authService : AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
      
      return this.authService.signup(dto);
    }
    //@HttpCode(HttpStatus.OK) // Since post request normally 
    @Post('signin')                         // return 201 httpStatus code to indidate the server as created something in the database using @HttpCode decorator allow us to pass HttpStatus we wanted to use manually.
    signin(@Body() dto: AuthDto){
      return this.authService.signin(dto);
    }
    
    
}
