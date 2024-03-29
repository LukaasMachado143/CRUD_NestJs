import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user.service';
import { userRepositoryMock } from '../mocks/user-repository.mock';
import { userEntityList } from '../mocks/user-entity-list.mock';
import { createUserDTO } from '../mocks/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePatchUserDTOMock } from '../mocks/update-patch-user-dto.mock';

describe('User Service', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validate definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.list();
      expect(result).toEqual(userEntityList);
    });

    test('method show', async () => {
      const result = await userService.show(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(1, updatePatchUserDTOMock);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(true);
    });
  });
});
