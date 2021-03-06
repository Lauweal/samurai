import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISession } from '@samurai/interfaces';
import { AuthService } from '../auth.service';

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
    req: Request,
    _account: string,
    _password: string
  ): Promise<ISession> {
    const { platform, fingerprint } = req.headers as Record<string, any>;
    let account = await this.authService.validateUser(_account);
    if (req.path.includes('sigin') && !account) {
      account = await this.authService.sigin(_account, _password)
      return { account, platform, fingerprint };
    }
    if (req.path.includes('login') && (!account || this.authService.decrypt(account.password) !== _password)) throw new HttpException('登录失败', HttpStatus.UNAUTHORIZED);
    if (req.path.includes('login') && this.authService.decrypt(account.password) === _password) return { account, platform, fingerprint };
    return null
  }
}
