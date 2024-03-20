import { FileService } from "../../../file/file.service";

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    uploadProfilePhoto: jest.fn().mockResolvedValue(true),
    uploadFiles: jest.fn().mockResolvedValue(true),
    uploadFilesFields: jest.fn().mockResolvedValue(true),
  }
}