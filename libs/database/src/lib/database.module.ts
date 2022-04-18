import { Global, Module } from '@nestjs/common';
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

  static forRootAsync(options: IDatabaseModuleOptions = { imports: [] }) {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRootAsync({
        imports: [...options.imports, ConfigModule],
        useClass: DatabaseService
      })],
    }
  }
}
