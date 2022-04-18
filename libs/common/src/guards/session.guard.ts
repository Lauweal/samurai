import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionGuard extends AuthGuard('custom') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt = await super.canActivate(context);
    if (!jwt) throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    return true;
  }
}
