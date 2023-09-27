import {} from 'class-validator';

export class ColaboradorDTO {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cargo: string;
  data_admissao: Date;
  imagem: string;
  idGestor: string;
}
