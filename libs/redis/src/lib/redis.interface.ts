import { ModuleMetadata } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

export interface RedisModuleOptions extends RedisOptions {
  name?: string;
  url?: string;
  onClientReady?(client: Redis): void;
}

export interface RedisClient {
  defaultKey: string;
  clients: Map<string, Redis>;
  size: number;
}


export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) =>
    | RedisModuleOptions
    | RedisModuleOptions[]
    | Promise<RedisModuleOptions>
    | Promise<RedisModuleOptions[]>;
  inject?: any[];
}
