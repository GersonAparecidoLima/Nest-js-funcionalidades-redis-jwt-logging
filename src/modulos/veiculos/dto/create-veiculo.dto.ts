import { IsString, IsInt, ValidateNested } from 'class-validator';
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

  @ValidateNested()
  @Type(() => MarcaDto)
  marca: MarcaDto;
}
