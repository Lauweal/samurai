import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { promisify } from 'util';

@Injectable()
export class LoginGuard extends AuthGuard('local') {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    console.log(context.switchToHttp().getRequest())
    return true;
  }
}
