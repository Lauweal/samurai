import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { DatabaseModule } from '@samurai/database';
import { resolve } from 'path';
import { useRedisFactory } from '../redis/redis.service'
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), 'apps/server', `${process.env.NODE_ENV}.env`),
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    // DatabaseModule.forRootAsync(),
    RedisModule.forRootAsync({
      useFactory: () => {
        return []
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
