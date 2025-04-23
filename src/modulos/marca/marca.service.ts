import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(createMarcaDto);
    return this.marcaRepository.save(marca);
  }

  async findAll(): Promise<Marca[]> {
    return this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepository.findOne({
      where: { id }, // Atualizado para passar um objeto com a chave "where"
    });
    if (!marca) {
      throw new NotFoundException(`Marca com id ${id} não encontrada`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.marcaRepository.preload({
      id,
      ...updateMarcaDto,
    });
    if (!marca) {
      throw new NotFoundException(`Marca com id ${id} não encontrada`);
    }
    return this.marcaRepository.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.marcaRepository.findOne({
      where: { id }, // Atualizado para passar um objeto com a chave "where"
    });
    if (!marca) {
      throw new NotFoundException(`Marca com id ${id} não encontrada`);
    }
    await this.marcaRepository.remove(marca);
  }
}
