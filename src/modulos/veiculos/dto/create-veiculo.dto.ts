import { IsString, IsInt, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MarcaDto {
  @IsInt()
  id: number;
}

export class CreateVeiculoDto {
  @IsString()
  modelo: string;

  @IsInt()
  ano: number;

  @IsOptional()  
  @IsNumber()   // Mudança para @IsNumber
  valor?: number;

  @ValidateNested()
  @Type(() => MarcaDto)
  marca: MarcaDto;
}
