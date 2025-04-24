import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoEntity } from './veiculo.entity';
import { Marca } from '../marca/marca.entity';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity, Marca])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}
