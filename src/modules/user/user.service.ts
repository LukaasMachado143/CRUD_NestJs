import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { hash, genSalt } from "bcrypt"
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }


    async create(userData: CreateUserDTO) {
        const isExistsEmail = await this.userRepository.exists({ where: { email: userData.email } })
        if (isExistsEmail) throw new BadRequestException('Email já está em uso')
        const hashedPAssword: string = await hash(userData.password, await genSalt())
        const user = this.userRepository.create({ ...userData, password: hashedPAssword })
        return await this.userRepository.save(user)

    }

    async list() {
        return await this.userRepository.find({ order: { updatedAt: -1 } })
    }

    async show(id: number) {
        await this.exists(id)
        return await this.userRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, userData: any) {
        await this.exists(id)
        if (userData.password) userData.password = await hash(userData.password, await genSalt())
        await this.userRepository.update(id, userData)
        return this.show(id)
    }

    async delete(id: number) {
        await this.exists(id)
        return this.userRepository.delete(id)
    }

    async exists(id: number) {
        if (!await this.userRepository.exists({ where: { id } })) throw new NotFoundException(`Usuário: ${id} não existe !`)
    }
}