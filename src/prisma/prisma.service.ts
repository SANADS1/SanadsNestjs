import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
 
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources: {
                db: {
                   url: config.get('DATABASE_URL'),
                   
                },
            },
        });
        //console.log(config.get('DATABASE_URL'));
    }

    cleanDb() {
      return this.$transaction([
        this.bookmark.deleteMany(),
        this.user.deleteMany(),
      ])
    }
}
// not advisable to include your db url like hard coded like that above cause it will appear in your github repo which is not secure