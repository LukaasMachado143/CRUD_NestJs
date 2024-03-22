import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterDTOMock } from '../src/modules/auth/tests/mocks/auth-register-dto.mock';
import { authLoginDTOMock } from '../src/modules/auth/tests/mocks/auth-login-dto.mock';
import { Role } from '../src/enums/role.enum';
import { CreateUserDTO } from '../src/modules/user/dto/create-user.dto';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {

  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Register new user', async () => {

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTOMock)

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body.accessToken).toEqual('string')

  });

  it('Login with new user', async () => {

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTOMock.email,
        password: authRegisterDTOMock.password
      })
    accessToken = response.body.accessToken
    expect(response.statusCode).toEqual(201)
    expect(typeof accessToken).toEqual('string')

  });

  it('get connected user data', async () => {

    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .send()
      .set('Authorization', `bearer ${accessToken}`)

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body.id).toEqual('number')
    expect(response.body.role).toEqual(Role.User)

  });

  it('Register new user as admin', async () => {

    const userData: CreateUserDTO = {
      name: 'Teste 2',
      email: 'teste2@teste.com',
      password: '123456789',
      profilePhotoPath: 'Caminho da imagem de perfil de Teste 2'
    }
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userData)

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body.accessToken).toEqual('string')
    accessToken = response.body.accessToken

  });

  it('check registered role, and the role must be user', async () => {

    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .send()
      .set('Authorization', `bearer ${accessToken}`)

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body.id).toEqual('number')
    expect(response.body.role).toEqual(Role.User)

    userId = response.body.id
  });

  it('trying get all users by user not admin type', async () => {

    const response = await request(app.getHttpServer())
      .get('/users')
      .send()
      .set('Authorization', `bearer ${accessToken}`)

    expect(response.statusCode).toEqual(403)
    expect(response.body.error).toEqual('Forbidden')

  });

  it('Updating last connected user for admin user', async () => {
    const ds = await dataSource.initialize()

    const qr = ds.createQueryRunner();

    await qr.query(`UPDATE users SET role = ${Role.Admin} WHERE id = ${userId};`)
    const rows = await qr.query(`SELECT * FROM users WHERE id = ${userId};`)

    ds.destroy();
    expect(rows.length).toEqual(1)
    expect(rows[0].role).toEqual(Role.Admin)
  });

  it('trying get all users by admin user', async () => {

    const response = await request(app.getHttpServer())
      .get('/users')
      .send()
      .set('Authorization', `bearer ${accessToken}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.length).toEqual(2)

  });
});
