import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    // Determina o caminho correto para as entidades (ts para desenvolvimento, js para produção)
    const entitiesPath = path.resolve(__dirname, '..', '**', '*.entity.{ts,js}');
    
    //console.log('Entities path:', entitiesPath);

    // Determina o caminho para as migrações
    const migrationsPath = path.resolve(__dirname, '..', 'migrations', '*.js');

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [entitiesPath],
      migrations: [migrationsPath],  // Caminho das migrações
      synchronize: false,  // Desative em produção
      //logging: true,  // Mantenha o log para debug
    };
  }
}
