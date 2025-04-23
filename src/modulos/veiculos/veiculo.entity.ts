import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { Marca } from '../marca/marca.entity';
  
  @Entity({ name: 'veiculos' })
  export class VeiculoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'modelo', type: 'varchar', length: 100 })
    modelo: string;
  
    @Column({ name: 'ano', type: 'int' })
    ano: number;
  
    @ManyToOne(() => Marca)
    @JoinColumn({ name: 'marca_id' })
    marca: Marca;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
  }
  