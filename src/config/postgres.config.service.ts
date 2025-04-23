import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    // Define o caminho das entidades baseado no ambiente
    const entitiesPath = isProduction
      ? path.resolve(__dirname, '..', '**', '*.entity.js')
      : path.resolve(__dirname.replace('dist', 'src'), '..', '**', '*.entity.ts');

    console.log('isProduction:', isProduction);
    console.log('Entities path:', entitiesPath);

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [entitiesPath],
      synchronize: true, // cuidado: usar só em dev
    };
  }
}
