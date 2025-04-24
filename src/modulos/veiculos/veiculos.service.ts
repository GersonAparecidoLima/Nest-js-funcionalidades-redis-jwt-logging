import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoEntity } from './veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(VeiculoEntity)
    private readonly veiculoRepository: Repository<VeiculoEntity>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<VeiculoEntity> {
    const veiculo = this.veiculoRepository.create(createVeiculoDto);
    return this.veiculoRepository.save(veiculo);
  }

  async findAll(): Promise<VeiculoEntity[]> {
    return this.veiculoRepository.find({
      relations: ['marca'],
    });
  }

  async findOne(id: string): Promise<VeiculoEntity> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id },
      relations: ['marca'],
    });

    if (!veiculo) {
      throw new NotFoundException(`Veículo com id ${id} não encontrado`);
    }

    return veiculo;
  }

  async update(id: string, updateVeiculoDto: UpdateVeiculoDto): Promise<VeiculoEntity> {
    await this.veiculoRepository.update(id, updateVeiculoDto);
    return this.findOne(id); // já lança 404 se não encontrar
  }

  async remove(id: string): Promise<void> {
    const veiculo = await this.findOne(id); // garante que existe antes de deletar
    await this.veiculoRepository.softDelete(veiculo.id);
  }
}
