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

// @UseInterceptors(LogInterceptor) -> uso do interceptador na controller toda
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly service: UserService) { }

    // @UseInterceptors(LogInterceptor) -> uso do interceptador em cada rota
    @Roles(Role.Admin)
    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return await this.service.create(userData)
    }

    @Roles(Role.Admin)
    @Get()
    async list() {
        return await this.service.list()
    }

    @Roles(Role.Admin)
    @Get(':id')
    async show(@ParamId() id: number) {
        return await this.service.show(id)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() userData: UpdatePutUserDTO, @ParamId() id: number) {

        return await this.service.update(id, userData)
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() userData: UpdatePatchUserDTO, @ParamId() id: number) {
        return await this.service.update(id, userData)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id)
    }

}