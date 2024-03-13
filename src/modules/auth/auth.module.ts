import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/modules/user/user.module";
import { AuthService } from "./auth.service";
import { FileModule } from "../file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        JwtModule.register({ secret: String(process.env.JWT_SECRET) }),
        forwardRef(() => UserModule),
        FileModule,
        TypeOrmModule.forFeature([UserEntity])],
    exports: [AuthService]
})
export class AuthModule { }