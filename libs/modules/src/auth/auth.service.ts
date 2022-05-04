import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@samurai/database';
import { Repository } from 'typeorm';
import * as CryptoJS from 'crypto-js';
import { IAccount } from '@samurai/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: Repository<Account>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) { }

  async validateUser(account: string): Promise<any> {
    const user = await this.repo.findOne({
      where: { account },
      select: ['account', 'id', 'phone', 'email', 'password'],
    });
    if (user) return user;
    return null;
  }

  async validateAccount(account: string) {
    return await this.repo.findOne({ where: { account }, select: ['account'] })
  }

  async login(user: any) {
    return this.jwt.signAsync(user, { secret: this.config.get('JWT_SECRET') });
  }

  async sigin(_account: string, _password: string) {
    const account = this.repo.create();
    account.account = _account;
    account.password = this.encrypt(_password);
    return this.repo.save(account);
  }

  /** 更新账号 */
  async updateAccount(params: Partial<IAccount>) {
    const { account, ...payload } = params
    return this.repo.update(payload, { account })
  }

  encrypt(source: string) {
    const key = CryptoJS.enc.Utf8.parse(this.config.get('KEY') as string);
    const iv = CryptoJS.enc.Utf8.parse(this.config.get('IV') as string);
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(source), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext.toString().toUpperCase();
  }

  decrypt(source: string) {
    const key = CryptoJS.enc.Utf8.parse(this.config.get('KEY') as string);
    const iv = CryptoJS.enc.Utf8.parse(this.config.get('IV') as string);
    const code = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(source)), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
    return code.toString()
  }
}
