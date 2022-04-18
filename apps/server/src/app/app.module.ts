import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: () => [{
    //     name: 'cache',
    //     host: '127.0.0.1',
    //     port: 6379,
    //     password: 'test@dbuser2018',
    //     db: 0
    //   }],
    //   inject: [ConfigService]
    // }),
    DatabaseModule.forRootAsync()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
