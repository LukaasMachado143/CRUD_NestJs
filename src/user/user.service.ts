import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    dbContext = this.prisma.user

    async create(userData: CreateUserDTO) {
        return await this.dbContext.create({
            data: userData,
        })
    }

    async list() {
        return await this.dbContext.findMany({
            orderBy: { updatedAt: "desc" }
        })
    }

    async show(id: number) {
        await this.exists(id)
        return await this.dbContext.findUnique({
            where: { id }
        })
    }

    async update(id: number, userData: any) {
        await this.exists(id)
        return this.dbContext.update({ where: { id }, data: userData })
    }

    async delete(id: number) {
        await this.exists(id)
        return this.dbContext.delete({ where: { id } })
    }

    async exists(id: number) {
        if (!(await this.dbContext.count({
            where: {
                id
            }
        }))) throw new NotFoundException(`Usuário: ${id} não existe !`)
    }
}