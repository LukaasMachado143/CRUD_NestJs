import { Test, TestingModule } from "@nestjs/testing"
import { FileService } from "../../file.service"
import { userServiceMock } from "../../../auth/tests/mocks/user-service.mock"
import { getPhoto } from "../mocks/get-photo.mock"
import exp from "constants"

describe('File Service', () => {

  let fileService: FileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        userServiceMock
      ]
    }).compile()

    fileService = module.get<FileService>(FileService)
  })

  test('Validate definition', () => {
    expect(fileService).toBeDefined()
  })

  describe('upload', () => {

    test('method  uploadProfilePhoto', async () => {
      const photo = await getPhoto()
      const result = await fileService.uploadProfilePhoto(photo, 1)
      expect(result).toBe(true)
    })

    test('method  uploadFiles', async () => {
      const photo1 = await getPhoto()
      const photo2 = await getPhoto()
      const photo3 = await getPhoto()
      const result = await fileService.uploadFiles([photo1, photo2, photo3])
      expect(result).toBe(true)

    })

    test('method  uploadFilesFields', async () => {
      const photo = await getPhoto()
      const photo1 = await getPhoto()
      const photo2 = await getPhoto()
      const photo3 = await getPhoto()
      const filesFields: { photo: Express.Multer.File, files: Express.Multer.File[] } = { photo, files: [photo1, photo2, photo3] }
      const result = await fileService.uploadFilesFields(filesFields,1)
      expect(result).toBe(true)
    })

  })
})