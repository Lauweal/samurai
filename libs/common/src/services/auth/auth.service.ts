import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from '@samurai/database'
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: Repository<Account>,
    private readonly jwt: JwtService
  ) { }

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.repo.findOne({
      where: { account, password },
      select: ['account', 'id', 'phone', 'email'],
    });
    if (user) return user;
    return null;
  }

  async login(user: any) {
    return this.jwt.signAsync(user);
  }

  async sigin(_account: string, _password: string) {
    const account = this.repo.create();
    account.account = _account;
    account.password = _password;
    return this.repo.save(account);
  }
}
