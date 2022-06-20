import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from "../../prisma/prisma.service";
import {
    ExtractJwt,
    Strategy,
} from 'passport-jwt';




@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
){
    constructor(
        config: ConfigService,
        private prisma: PrismaService,
        ){
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),

        });
    }

   async validate(payload: {
        sub: number,       // used sub(id) to find a user
        email: string,       // or used email to find a user
    }){
       const user = 
       await this.prisma.user.findUnique({
           where: {
               id: payload.sub,
           }
       })
       delete user.hash;
       return user; 
    }
} 