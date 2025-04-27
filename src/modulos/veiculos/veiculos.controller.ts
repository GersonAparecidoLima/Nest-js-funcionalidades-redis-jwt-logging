import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, UseInterceptors } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculosService.create(createVeiculoDto);
  }

  @Get()
  //Otimizando a Rota
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.veiculosService.findAll();
    console.log('Veiculo sendo buscado do BD!');
  }

  @Get(':id')
  //Otimizando a Rota
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const veiculo = await this.veiculosService.findOne(id);
    
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }
  
    return veiculo;
    console.log('Veiculo sendo buscado do BD!');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculosService.update(id, updateVeiculoDto); // agora o id é string como esperado
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veiculosService.remove(id); // agora id continua como string
  }

}
