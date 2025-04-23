import { IsString } from 'class-validator';

export class CreateMarcaDto {
  @IsString()
  descricao: string;
}

