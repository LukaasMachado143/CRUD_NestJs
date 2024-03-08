import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = (authorization ?? "").split(' ')[1]
    try {
      const tokenPayload = this.authService.checkToken(token)
      request.tokenPayload = tokenPayload
      const user = await this.userService.show(tokenPayload.id)
      request.user = user
      return true
    } catch (error) {
      return false
    }
  }

}