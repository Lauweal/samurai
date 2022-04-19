import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@samurai/database';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Account)
    private readonly account: Repository<Account>,
  ) { }


  async updateUser() {

  }
}
