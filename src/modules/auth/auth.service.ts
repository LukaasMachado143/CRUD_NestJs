import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/modules/user/user.service";
import { compare, genSalt, hash } from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly mailer: MailerService
	) { }

	createToken(user: User) {
		return {
			accessToken: this.jwtService.sign(
				{
					id: user.id,
					name: user.name,
					email: user.email
				},
				{
					expiresIn: '7 days',
					subject: String(user.id),
					issuer: "login",
					audience: 'users'
				}
			)
		}
	}

	checkToken(token: string) {
		try {
			const data = this.jwtService.verify(token, { issuer: 'login', audience: 'users' })
			return data

		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	isValidToken(token: string) {
		try {
			this.checkToken(token)
			return true
		} catch (error) {
			return false

		}
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findFirst({ where: { email } })
		if (!user || !await compare(password, user.password)) throw new UnauthorizedException('Email ou senha inválidos')
		return this.createToken(user)
	}

	async forget(email: string) {
		const user = await this.prisma.user.findFirst({ where: { email } })
		if (!user) throw new UnauthorizedException('Email inválidos')



		await this.mailer.sendMail({
			subject: "Recuperação de senha",
			to: 'lukaasmachado1432@gmail.com',
			template: 'forget',
			context: {
				name: user.name,
				token: this.jwtService.sign(
					{
						id: user.id,
					},
					{
						expiresIn: '30 minutes',
						subject: String(user.id),
						issuer: "forget",
						audience: 'users'
					}
				)
			}
		})
		return true
	}


	async reset(password: string, token: string) {
		try {
			const data = this.jwtService.verify(token, { issuer: 'forget', audience: 'users' })
			if (isNaN(Number(data.id))) throw new BadRequestException('Token Inválido')
			const user = await this.prisma.user.update({ where: { id: Number(data.id) }, data: { password: await hash(password, await genSalt()) } })
			return this.createToken(user)
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async register(data: AuthRegisterDTO) {
		const user = await this.userService.create(data)
		return this.createToken(user)

	}
}