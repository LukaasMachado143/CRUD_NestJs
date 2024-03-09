import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";
import { UserService } from "../user/user.service";

@Injectable()
export class FileService {

  constructor(private readonly userService: UserService) { }

  async uploadProfilePhoto(photo: Express.Multer.File, id: number) {
    const originalname = photo.originalname ?? photo[0].originalname
    const profilePhotoPath = join(__dirname, '..', '..', '..', 'uploads', 'photo', `${v4()}-${originalname}`)
    try {
      const buffer = photo.buffer ?? photo[0].buffer
      await writeFile(profilePhotoPath, buffer);
      await this.userService.update(id, { profilePhotoPath })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    try {
      files.forEach(async file => {
        const filePath = join(__dirname, '..', '..', '..', 'uploads', 'files', `${v4()}-${file.originalname}`)
        await writeFile(filePath, file.buffer);
      })

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async uploadFilesFields(filesFields: { photo: Express.Multer.File, files: Express.Multer.File[] }, id: number) {
    try {
      if (filesFields.photo) await this.uploadProfilePhoto(filesFields.photo, id)
      if (filesFields.files) await this.uploadFiles(filesFields.files)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }
}