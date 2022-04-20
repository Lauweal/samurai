import { Controller, Put } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Put('updateUser')
  async updateUser() { }
}
