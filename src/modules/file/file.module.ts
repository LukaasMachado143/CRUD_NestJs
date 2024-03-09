import { Module, forwardRef } from "@nestjs/common";
import { FileService } from "./file.service";
import { UserModule } from "../user/user.module";

@Module({
  providers: [FileService],
  exports: [FileService],
  imports: [forwardRef(() => UserModule)]
})
export class FileModule { }