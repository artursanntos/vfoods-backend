import { } from "class-validator";

export class ColaboradorDTO {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
    data_admissao: Date;
    endereco: string;
    cep: string;
    imagem: string;
    idGestor: string;

}

