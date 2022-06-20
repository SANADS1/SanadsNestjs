import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () =>{
    const moduleRef = 
       await Test.createTestingModule({
          imports: [AppModule],
       }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );  
    await app.init(); 
    await app.listen(3222);

    //prisma = app.get(PrismaService);
   // await prisma.cleanDb();
    pactum.request.setBaseUrl('http:///localhost:3222');
  });
  afterAll(() => {
     app.close();
  });
   
  //it.todo('should pass');
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'Adedunni01@gmail.com',
      password: '2435',
    }
    describe('Signup', () => {
      it('should throw if email empty', () => {
           
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
        // .
      });
      it('should throw if password empty', () => {
           
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.email,
        })
        .expectStatus(400);
        // .
      });
      it('should throw if no body is provided', () => {
           
        return pactum
        .spec()
        .post('/auth/signup')
       
        .expectStatus(400);
        // .
      });

      it('should signup', () => { 
       
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201);
        // .inspect();

      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
           
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
        // .
      });
      it('should throw if password empty', () => {
           
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.email,
        })
        .expectStatus(400);
        // .
      });
      it('should throw if no body is provided', () => {
           
        return pactum
        .spec()
        .post('/auth/signin')
       
        .expectStatus(400);
        // .
      });

      
      it('should signin', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(201);
         //.inspect();

      });
    });
  });

  describe('User', ()  => {
    describe('Get me', () => {});

    describe('Edit user', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});

    describe('Get bokmarks', () => {});

    describe('Get bookmark by id', () => {});

    describe('Edit bookmark', ()  => {});

    describe('Delete bookmark', () => {});


  });
 
})






/**import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});**/
