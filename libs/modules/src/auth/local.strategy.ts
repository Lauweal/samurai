import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Request as IRequest } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISession } from '@samurai/interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    req: IRequest,
    _account: string,
    _password: string
  ): Promise<ISession> {
    const { platform, fingerprint } = req.headers;
    let account = await this.authService.validateUser(_account);
    console.log(account, req.path.includes('sigin'))
    if (req.path.includes('sigin') && !account) {
      account = await this.authService.sigin(_account, _password)
      return { account, platform, fingerprint };
    }
    if (req.path.includes('login') && (!account || this.authService.decrypt(account.password) !== _password)) throw new HttpException('登录失败', HttpStatus.UNAUTHORIZED);
    if (req.path.includes('login') && this.authService.decrypt(account.password) === _password) return { account, platform, fingerprint };
    return null
  }
}
