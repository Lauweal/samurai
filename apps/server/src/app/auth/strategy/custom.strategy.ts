import {
  HttpException,
  HttpStatus,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ISession } from '@samurai/interfaces';
import { Strategy } from 'passport-custom';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy) {
  async validate(@Request() req): Promise<any> {
    const { passport } = req.session;
    if (!passport || !passport.user) {
      throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    }
    const { account } = passport.user as ISession;
    return account;
  }
}
