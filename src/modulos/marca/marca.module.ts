// src/modulos/marca/marca.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './marca.entity';  // Certifique-se de que está importando a entidade Marca corretamente
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],  // Registre a entidade Marca aqui
  controllers: [MarcaController],
  providers: [MarcaService],
})
export class MarcaModule {}
