import { DynamicModule, Module } from '@nestjs/common';
import { REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';
import { createAsyncClientOptions, createClient } from './redis.provider';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static register(options: RedisModuleOptions | RedisModuleOptions[]): DynamicModule {
    return {
      module: RedisModule,
      providers: [createClient(), { provide: REDIS_MODULE_OPTIONS, useValue: options }, RedisService],
      exports: [RedisService]
    }
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [createClient(), createAsyncClientOptions(options), RedisService],
      exports: [RedisService]
    }
  }
}
