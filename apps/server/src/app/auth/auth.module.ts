import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@samurai/common';
import { Account } from '@samurai/database';
import { AuthController } from './auth.controller';
import { CustomStrategy } from './strategy/custom.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CustomStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule { }
