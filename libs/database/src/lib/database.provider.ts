import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('DB_HOST'),
      port: Number(this.config.get('DB_PORT')),
      username: this.config.get('DB_ACCOUNT'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      synchronize: true,
      logger: 'debug',
      logging: this.config.get('DB_ENV') === 'development',
      entities: [],
      migrations: [(__dirname + '/migrations/**/*{.ts,.js}') as string],
      extra: {
        max: this.config.get('DB_MAX_CONNECTIONS'),
      },
    }
  }
}
