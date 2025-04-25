import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Marca } from '../marca/marca.entity';

@Entity({ name: 'veiculos' })
export class VeiculoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  modelo: string;

  @Column({ type: 'int' })
  ano: number;

  @ManyToOne(() => Marca, { eager: true }) // eager se quiser que sempre traga junto
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // nova coluna aqui
  valor: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
