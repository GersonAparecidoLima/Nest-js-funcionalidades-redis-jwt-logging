import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcaService.create(createMarcaDto);
  }

  @Get()
  //Otimizando a Rota
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.marcaService.findAll();
   // console.log('Marca sendo buscado do BD!');
  }

  @Get(':id')
  //Otimizando a Rota
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.marcaService.findOne(id);
    //console.log('Marca sendo buscado do BD!');
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMarcaDto: UpdateMarcaDto,
  ) {
    return this.marcaService.update(id, updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marcaService.remove(id);
  }
}
