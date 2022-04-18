import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as IRequest } from 'express';
import { AuthService, SessionGuard } from '@samurai/common';
import { AuthGuard } from '@nestjs/passport';
import { promisify } from 'util';
import { AccountDto } from '@samurai/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: IRequest) {
    if (!req.user) {
      req.logout();
    } else {
      await promisify(req.login.bind(req))(req.user);
    }
    return this.auth.login(req.user);
  }

  @Post('loginout')
  async loginout(@Request() req: IRequest) {
    return new Promise((res: any) => {
      (req as any).session.destroy((err) => {
        if (err) return res(null);
        return res({ data: true });
      });
    });
  }

  @Get('checkAccount')
  async checkAccount() { }

  @Post('sigin')
  async sigin(@Body() body: AccountDto) {
    return this.auth.sigin(body.account, body.password);
  }

  @Get('reloadToken')
  @UseGuards(SessionGuard)
  async reloadToken(@Request() req: any) {
    const { passport } = req.session;
    return this.auth.login(passport.user);
  }
}