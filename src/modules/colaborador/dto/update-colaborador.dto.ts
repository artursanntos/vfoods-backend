import { IsOptional } from "class-validator";

export class ColaboradorDTO {
    @IsOptional()
    id: string;
    @IsOptional()
    nome: string;
    @IsOptional()
    email: string;
    @IsOptional()
    telefone: string;
    @IsOptional()
    cargo: string;
    @IsOptional()
    data_admissao: Date;
    @IsOptional()
    endereco: string;
    @IsOptional()
    cep: string;
    @IsOptional()
    imagem: string;
    @IsOptional()
    idGestor: string;

}

