import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizationGuard extends AuthGuard('jwt') {
  getSession(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { session: { passport }, user } = req;
    if ((!passport || !passport.user || !passport.user.account) && !user) return undefined;
    return user
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const user = this.getSession(context);
    if (!user) throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    return true;
  }
}
