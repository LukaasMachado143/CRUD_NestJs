import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleWare implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log('UserIdCheckMiddleWare', 'Antes');
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID Inválido')
        }
        console.log('UserIdCheckMiddleWare', 'Depois');

        next()
    }

}