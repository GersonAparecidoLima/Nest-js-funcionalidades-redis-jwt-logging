import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';



@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}
  
 
  @Post()
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculosService.create(createVeiculoDto);
  }

  @UseGuards(AutenticacaoGuard)
  @Get()
  //Otimizando a Rota
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.veiculosService.findAll();
    console.log('Veiculo sendo buscado do BD!');
  }

    // Rota pública com cache
    @UseInterceptors(CacheInterceptor)
    @Get('/publico') 
    findAllPublico() {
      console.log('Veículo sendo buscado do BD (rota pública com cache)!');
      return this.veiculosService.findAll();
    }

  @UseGuards(AutenticacaoGuard)
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

  @UseGuards(AutenticacaoGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculosService.update(id, updateVeiculoDto); // agora o id é string como esperado
  }

  @UseGuards(AutenticacaoGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veiculosService.remove(id); // agora id continua como string
  }

}
