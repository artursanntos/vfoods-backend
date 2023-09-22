export class NotaMensalDto {
    id: string;
    mesAno: string;//DateTime
    //exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
    //ATENCAO: Sempre usar esta configuracao, alterando apenas o mes e ano
    notaMensal: number;
    idColaborador: string;
}