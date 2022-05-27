import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { promisify } from 'util';

@Injectable()
export class SessionGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest()
  }

  getSession(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { session: { passport }, user } = req;
    if ((!passport || !passport.user || !passport.user.account) && !user) return undefined;
    return user
  }

  async resetLogin(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { session: { passport }, user } = req;
    if (!passport) {
      await promisify(req.login.bind(req))(user)
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const user = this.getSession(context);
    if (!user) throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    return true;
  }
}
