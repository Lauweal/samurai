import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../../guards';
import { QueryAccountDto } from '@samurai/models';
import { promisify } from 'util';
import { Request as IRequest } from 'express';
import { AuthService } from './auth.service';
import { IAccount } from '@samurai/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: IRequest, @Body() body: IAccount) {
    if (!req.user) {
      req.logout();
    }
    if (body.save) {
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
    return { data: 1 };
  }

  @Get('checkAccount')
  async checkAccount(@Query() query: QueryAccountDto) {
    const { account } = query
    return await this.auth.validateAccount(account).then((ac) => !ac)
  }

  @Post('sigin')
  @UseGuards(AuthGuard('local'))
  async sigin(@Request() req: IRequest, @Body() body: IAccount) {
    if (!req.user) {
      req.logout();
    }
    if (body.save) {
      await promisify(req.login.bind(req))(req.user);
    }
    return this.auth.login(req.user);
  }

  @Get('reloadToken')
  @UseGuards(SessionGuard)
  async reloadToken(@Request() req: any) {
    return this.auth.login(req.session.passport.user);
  }
}
