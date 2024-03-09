import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/modules/user/user.module";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { FileModule } from "../file/file.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), forwardRef(() => UserModule), PrismaModule, FileModule],
    exports: [AuthService]
})
export class AuthModule { }