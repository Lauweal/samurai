import { Module } from '@nestjs/common';
import { AuthModule } from '@samurai/modules'
import { resolve } from 'path';
import { RedisModule } from '@samurai/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@samurai/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(
        __dirname,
        'config',
        `${process.env.NODE_ENV}.env`
      ),
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
