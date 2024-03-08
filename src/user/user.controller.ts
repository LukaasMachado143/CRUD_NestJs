import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enums";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor) // -> uso do interceptador na controller toda
@Controller('users')
export class UserController {

    constructor(private readonly service: UserService) { }

    // @UseInterceptors(LogInterceptor) -> uso do interceptador em cada rota
    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return await this.service.create(userData)
    }

    @Get()
    async list() {
        return await this.service.list()
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        return await this.service.show(id)
    }

    @Put(':id')
    async update(@Body() userData: UpdatePutUserDTO, @ParamId() id: number) {

        return await this.service.update(id, userData)
    }

    @Patch(':id')
    async updatePartial(@Body() userData: UpdatePatchUserDTO, @ParamId() id: number) {
        return await this.service.update(id, userData)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id)
    }

}