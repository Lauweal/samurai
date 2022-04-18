import { Provider } from "@nestjs/common";
import * as Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from "./redis.constants";
import { RedisClient, RedisModuleAsyncOptions, RedisModuleOptions } from "./redis.interface";

export class RedisClientError extends Error { }

async function getClient(options: RedisModuleOptions): Promise<Redis.Redis> {
  const { onClientReady, url, ...opt } = options;
  // @ts-ignore
  const client = url ? new Redis(url) : new Redis(opt);
  if (onClientReady) {
    onClientReady(client)
  }
  return client;
}

export function createClient(): Provider {
  return {
    provide: REDIS_CLIENT,
    useFactory: async (options: RedisModuleOptions | RedisModuleOptions[]): Promise<RedisClient> => {
      const clients = new Map<string, Redis.Redis>();
      let defaultKey = uuidv4();

      if (Array.isArray(options)) {
        await Promise.all(
          options.map(async o => {
            const key = o.name || defaultKey;
            if (clients.has(key)) {
              throw new RedisClientError(`${o.name || 'default'} client is exists`);
            }
            clients.set(key, await getClient(o));
          }),
        );
      } else {
        if (options.name && options.name.length !== 0) {
          defaultKey = options.name;
        }
        clients.set(defaultKey, await getClient(options));
      }

      return {
        defaultKey,
        clients,
        size: clients.size,
      };
    }
  }
}


export const createAsyncClientOptions = (options: RedisModuleAsyncOptions) => ({
  provide: REDIS_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
