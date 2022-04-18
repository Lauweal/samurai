import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@samurai/database';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), 'apps/server', `${process.env.NODE_ENV}.env`),
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    DatabaseModule.forRootAsync()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
