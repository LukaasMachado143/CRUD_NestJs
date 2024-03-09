import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";
import { UserService } from "../user/user.service";

@Injectable()
export class FileService {

  constructor(private readonly userService: UserService) { }

  async uploadProfilePhoto(photo: Express.Multer.File, id: number) {
    const profilePhotoPath = join(__dirname, '..', '..', '..', 'uploads', 'profile-photo', `${v4()}-${photo.originalname}`)
    try {
      await writeFile(profilePhotoPath, photo.buffer);
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
}