import { ConfigService } from "@nestjs/config";
import { RedisModuleOptions } from "nestjs-redis";

export const useRedisFactory = (config: ConfigService): RedisModuleOptions[] => {
  console.log(config)
  return [
    {
      name: 'cache',
      port: Number(config.get('CACHE_PORT')),
      host: config.get('CACHE_HOST'),
      password: config.get('CACHE_PASSWORD'),
      db: Number(config.get('CACHE_DB')),
    }
  ]
}
