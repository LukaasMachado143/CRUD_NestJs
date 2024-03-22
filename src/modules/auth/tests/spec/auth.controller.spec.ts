import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth.controller';
import { authServiceMock } from '../mocks/auth-service.mock';
import { AuthGuard } from '../../../../guards/auth.guard';
import { guardMock } from '../../../user/tests/mocks/guard.mock';
import { fileServiceMock } from '../mocks/file-service.mock';
import { authLoginDTOMock } from '../mocks/auth-login-dto.mock';
import { accessToken } from '../mocks/access-token.mock';
import { authRegisterDTOMock } from '../mocks/auth-register-dto.mock';
import { authForgetDTOMock } from '../mocks/auth-forget-dto.mock';
import { authResetDTOMock } from '../mocks/auth-reset-dto.mock';
import { userEntityList } from '../../../user/tests/mocks/user-entity-list.mock';
import { getPhoto } from '../../../file/tests/mocks/get-photo.mock';

describe('Auth Controller', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validate definition', () => {
    expect(authController).toBeDefined();
  });

  describe('Autentication flow', () => {
    test('method login', async () => {
      const result = await authController.login(authLoginDTOMock);
      expect(result).toStrictEqual({ accessToken });
    });

    test('method register', async () => {
      const result = await authController.register(authRegisterDTOMock);
      expect(result).toStrictEqual({ accessToken });
    });

    test('method forget', async () => {
      const result = await authController.forget(authForgetDTOMock);
      expect(result).toStrictEqual({ success: true });
    });

    test('method reset', async () => {
      const result = await authController.reset(authResetDTOMock);
      expect(result).toStrictEqual({ accessToken });
    });
  });

  describe('Authenticated routes', () => {
    test('method me', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toStrictEqual(userEntityList[0]);
    });
    test('method uploadPhoto', async () => {
      const photo: Express.Multer.File = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toStrictEqual({ message: 'Profile photo updated' });
    });
    test('method uploadFiles', async () => {
      const photo: Express.Multer.File = await getPhoto();
      const photo1: Express.Multer.File = await getPhoto();
      const photo2: Express.Multer.File = await getPhoto();
      const photo3: Express.Multer.File = await getPhoto();
      const result = await authController.uploadFiles([
        photo,
        photo1,
        photo2,
        photo3,
      ]);
      expect(result).toStrictEqual({ message: 'Inserted files' });
    });
    test('method uploadFilesFields', async () => {
      const photo: Express.Multer.File = await getPhoto();
      const photo1: Express.Multer.File = await getPhoto();
      const photo2: Express.Multer.File = await getPhoto();
      const photo3: Express.Multer.File = await getPhoto();
      const filesFields = {
        photo,
        files: [photo1, photo2, photo3],
      };
      const result = await authController.uploadFilesFields(
        userEntityList[0],
        filesFields,
      );
      expect(result).toStrictEqual({ message: 'Inserted files' });
    });
  });
});
