import { Controller, Get } from '@nestjs/common';

@Controller('base')
export class BaseController {
  @Get()
  async getAppVersion() {

  }
}
