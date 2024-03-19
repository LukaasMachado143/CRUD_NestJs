import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Roles } from "../../decorators/roles.decorator";
import { Role } from "../../enums/role.enum";
import { AuthGuard } from "../../guards/auth.guard";
import { RoleGuard } from "../../guards/role.guard";
import { LogInterceptor } from "../../interceptors/log.interceptor";
import { ParamId } from "../../decorators/param-id.decorator";

@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
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