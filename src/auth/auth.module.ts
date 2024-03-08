import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [JwtModule.register({ secret: process.env.SECRET }), forwardRef(()=> UserModule), PrismaModule],
    exports:[AuthService]
})
export class AuthModule { }