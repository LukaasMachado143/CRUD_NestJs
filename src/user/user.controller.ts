import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return await this.service.create(userData)
    }

    @Get()
    async list() {
        return await this.service.list()
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return await this.service.show(id)
    }

    @Put(':id')
    async update(@Body() userData: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return await this.service.update(id, userData)
    }

    @Patch(':id')
    async updatePartial(@Body() userData: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return await this.service.update(id, userData)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete(id)
    }

}