import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly fileService: FileService) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return await this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return await this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user }
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('uploadPhoto')
    async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: 'image/*' }), new MaxFileSizeValidator({ maxSize: 1024 * 1024 })] })) photo: Express.Multer.File) {
        await this.fileService.uploadProfilePhoto(photo, user.id)
        return { message: 'Ptofile photo updated' }
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('uploadFiles')
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        await this.fileService.uploadFiles(files)
        return { message: 'Inserted files' }
    }

    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 5 }]))
    @UseGuards(AuthGuard)
    @Post('uploadFilesFields')
    async uploadFilesFields(@User() user, @UploadedFiles() filesFields: { photo: Express.Multer.File, files: Express.Multer.File[] }) {
        await this.fileService.uploadFilesFields(filesFields, user.id)
        return { message: 'Inserted files' }
    }

}