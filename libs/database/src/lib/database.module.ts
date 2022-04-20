import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDatabaseModuleOptions } from './database.interface';
import { DatabaseService } from './database.provider';


@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {

  static forRootAsync(options: IDatabaseModuleOptions = { imports: [] }): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      imports: [TypeOrmModule.forRootAsync({
        imports: [...options.imports, ConfigModule],
        useClass: DatabaseService
      })],
    }
  }
}
