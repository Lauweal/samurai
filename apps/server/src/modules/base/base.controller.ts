import { Controller, Get } from '@nestjs/common';

@Controller('base')
export class BaseController {
  @Get('version')
  async getAppVersion() {
    return "1.0.0"
  }
}
