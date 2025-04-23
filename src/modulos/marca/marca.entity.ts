// src/modulos/marca/entities/marca.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('marca')  // A tabela no banco de dados se chamará "marca"
export class Marca {
  @PrimaryGeneratedColumn()  // Chave primária autoincrementável
  id: number;

  @Column()  // Coluna para "descricao"
  descricao: string;
}
