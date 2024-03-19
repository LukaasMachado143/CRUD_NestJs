import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "../../user.controller";
import { userServiceMock } from "../../../auth/tests/mocks/user-service.mock";
import { AuthGuard } from "../../../../guards/auth.guard";
import { guardMock } from "../mocks/guard.mock";
import { RoleGuard } from "../../../../guards/role.guard";
import { UserService } from "../../user.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { createUserDTO } from "../mocks/create-user-dto.mock";
import { userEntityList } from "../mocks/user-entity-list.mock";
import { updatePatchUserDTOMock } from "../mocks/update-patch-user-dto.mock";
import { updatePutUserDTOMock } from "../mocks/update-put-user-dto.mock";



describe('User Controller', () => {

  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock]
    })
      .overrideGuard(ThrottlerGuard).useValue(guardMock)
      .overrideGuard(AuthGuard).useValue(guardMock)
      .overrideGuard(RoleGuard).useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  test('Validate definition', () => {
    expect(userController).toBeDefined()
    expect(userService).toBeDefined()
  })

  describe('guards tests', () => {

    test('quantity guards', () => {
      const guards = Reflect.getMetadata('__guards__', UserController)
      expect(guards.length).toEqual(3)
    })

    test('sequency guards', () => {
      const guards = Reflect.getMetadata('__guards__', UserController)
      expect(new guards[0]()).toBeInstanceOf(ThrottlerGuard)
      expect(new guards[1]()).toBeInstanceOf(AuthGuard)
      expect(new guards[2]()).toBeInstanceOf(RoleGuard)
    })
  })

  describe('Create', () => {
    test('method create', async () => {
      const result = await userController.create(createUserDTO)
      expect(result).toBe(userEntityList[0])
    })

  })

  describe('Read', () => {

    test('method list', async () => {
      const result = await userController.list()
      expect(result).toBe(userEntityList)
    })

    test('method show', async () => {
      const result = await userController.show(1)
      expect(result).toBe(userEntityList[0])
    })

  })

  describe('Update', () => {

    test('method update', async () => {
      const result = await userController.update(updatePutUserDTOMock, 1)
      expect(result).toBe(userEntityList[0])
    })

    test('method updatePartial', async () => {
      const result = await userController.updatePartial(updatePatchUserDTOMock, 1)
      expect(result).toBe(userEntityList[0])
    })

  })

  describe('Delete', () => {

    test('method delete', async () => {
      const result = await userController.delete(1)
      expect(result).toStrictEqual({ success: true })
    })

  })

})