import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Account } from './entities'


@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: Number(this.config.get('DB_PORT')),
      username: this.config.get('DB_ACCOUNT'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      synchronize: true,
      // logging: this.config.get('DB_ENV') === 'development',
      entities: [Account],
      migrations: [(__dirname + '/migrations/**/*{.ts,.js}') as string],
      extra: {
        max: this.config.get('DB_MAX_CONNECTIONS'),
      },
    }
  }
}
