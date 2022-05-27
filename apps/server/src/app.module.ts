import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { RedisModule } from '@samurai/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@samurai/database';
import { AuthModule } from './modules';

const envFilePath = resolve(__dirname, 'environments', `${process.env.NODE_ENV}.env`)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: any) => {
        return [
          {
            name: 'cache',
            port: Number(config.get('CACHE_PORT')),
            host: config.get('CACHE_HOST'),
            password: config.get('CACHE_PASSWORD'),
            db: Number(config.get('CACHE_DB')),
          },
          {
            name: 'session',
            port: Number(config.get('CACHE_PORT')),
            host: config.get('CACHE_HOST'),
            password: config.get('CACHE_PASSWORD'),
            db: Number(config.get('SESSION_DB')),
          },
        ];
      },
      inject: [ConfigService],
    }),
    DatabaseModule.forRootAsync(),
    AuthModule,
  ],
})
export class AppModule { }
