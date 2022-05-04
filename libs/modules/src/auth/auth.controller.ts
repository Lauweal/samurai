import { Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@samurai/common';
import { QueryAccountDto } from '@samurai/models';
import { promisify } from 'util';
import { Request as IRequest } from 'express';
import { AuthService } from './auth.service';

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

  @Get('hasAccount')
  async hasAccount(@Query() query) {
    console.log(query)
  }

  @Get('checkAccount')
  async checkAccount(@Query() query: QueryAccountDto) {
    const { account } = query
    return await this.auth.validateAccount(account).then((ac) => !ac)
  }

  @Post('sigin')
  @UseGuards(AuthGuard('local'))
  async sigin(@Request() req: IRequest) {
    if (!req.user) {
      req.logout();
    } else {
      await promisify(req.login.bind(req))(req.user);
    }
    return this.auth.login(req.user);
  }

  @Get('reloadToken')
  @UseGuards(SessionGuard)
  async reloadToken(@Request() req: any) {
    const { passport } = req.session;
    return this.auth.login(passport.user);
  }
}
