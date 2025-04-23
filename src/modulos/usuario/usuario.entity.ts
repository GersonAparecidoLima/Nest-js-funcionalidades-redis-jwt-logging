// src/modulos/usuario/usuario.entity.ts

import { PedidoEntity } from '../pedido/pedido.entity';  // Verifique se a importação está correta
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';  // A biblioteca class-transformer é necessária para @Exclude()

@Entity({ name: 'usuarios' })  // O nome da tabela no banco de dados será "usuarios"
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')  // A chave primária será do tipo UUID
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })  // Coluna "nome" com tamanho máximo de 100 caracteres
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })  // Coluna "email" com tamanho máximo de 70 caracteres
  email: string;

  @Exclude()  // A propriedade "senha" será excluída das respostas quando for serializada
  @Column({ name: 'senha', length: 255, nullable: false })  // Coluna "senha" com tamanho máximo de 255 caracteres
  senha: string;

  @CreateDateColumn({ name: 'created_at' })  // Data de criação
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })  // Data de atualização
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })  // Data de exclusão (soft delete)
  deletedAt: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)  // Relacionamento de um-para-muitos com PedidoEntity
  pedidos: PedidoEntity[];
}
