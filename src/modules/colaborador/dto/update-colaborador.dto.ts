import { IsOptional } from 'class-validator';

export class ColaboradorDTO {
  @IsOptional()
  id: string;
  @IsOptional()
  nome: string;
  @IsOptional()
  email: string;
  @IsOptional()
  senha: string;
  @IsOptional()
  telefone: string;
  @IsOptional()
  cargo: string;
  @IsOptional()
  data_admissao: Date;
  @IsOptional()
  imagem: string;
  @IsOptional()
  idGestor: string;
}
