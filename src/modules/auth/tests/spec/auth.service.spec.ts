import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { userRepositoryMock } from '../../../user/tests/mocks/user-repository.mock';
import { jwtServiceMock } from '../mocks/jwt-service.mock';
import { mailerServiceMock } from '../mocks/mailer-service.mock';
import { userServiceMock } from '../../../user/tests/mocks/user-service.mock';
import { userEntityList } from '../../../user/tests/mocks/user-entity-list.mock';
import { accessToken } from '../mocks/access-token.mock';
import { jwtPayloadMock } from '../mocks/jwt-payload.mock';
import { resetTokenMock } from '../mocks/reset-token.mock';
import { authRegisterDTOMock } from '../mocks/auth-register-dto.mock';

describe('Auth Service', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        mailerServiceMock,
        userServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validate definition', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('method createToken', () => {
      const result = authService.createToken(userEntityList[0]);
      expect(result).toStrictEqual({ accessToken });
    });

    test('method checkToken', () => {
      const result = authService.checkToken(accessToken);
      expect(result).toBe(jwtPayloadMock);
    });

    test('method isValidToken', () => {
      const result = authService.isValidToken(accessToken);
      expect(result).toBe(true);
    });
  });

  describe('Autentication', () => {
    test('method login', async () => {
      const result = await authService.login(
        'testelucas7@teste.com',
        '123456789',
      );
      expect(result).toStrictEqual({ accessToken });
    });

    test('method forget', async () => {
      const result = await authService.forget('testelucas7@teste.com');
      expect(result).toStrictEqual({ success: true });
    });

    test('method reset', async () => {
      const result = await authService.reset('123456789', resetTokenMock);
      expect(result).toStrictEqual({ accessToken });
    });

    test('method register', async () => {
      const result = await authService.register(authRegisterDTOMock);
      expect(result).toStrictEqual({ accessToken });
    });
  });
});
