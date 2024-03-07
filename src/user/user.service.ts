import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }
    select = {
        id: true,
        email: true,
        name: true,
    }

    dbContext = this.prisma.user

    async create(userData: CreateUserDTO) {
        return await this.dbContext.create({
            data: userData,
            select: this.select
        })
    }

    async list() {
        return await this.dbContext.findMany({
            select: this.select,
            orderBy: { updatedAt: "desc" }
        })
    }

    async show(id: number) {
        await this.exists(id)
        return await this.dbContext.findUnique({
            where: { id },
            select: this.select
        })
    }

    async update(id: number, userData: any) {
        await this.exists(id)
        return this.dbContext.update({ where: { id }, data: userData, select: this.select, })
    }

    async delete(id: number) {
        await this.exists(id)
        return this.dbContext.delete({ where: { id }, select: this.select, })
    }

    async exists(id: number) {
        if (!(await this.dbContext.count({
            where: {
                id
            }
        }))) throw new NotFoundException(`Usuário: ${id} não existe !`)
    }
}