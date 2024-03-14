import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "../../user.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UserEntity } from "../../user.entity"
import { userRepositoryMock } from "../mock/user-repository.mock"

describe('User Service', () => {

  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock
      ]
    }).compile();

    userService = module.get<UserService>(UserService)

  })

  test('Validate definition', () => {
    expect(userService).toBeDefined()
  })
})