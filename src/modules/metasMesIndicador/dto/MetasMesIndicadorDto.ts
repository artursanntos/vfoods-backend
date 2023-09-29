export class MetasMesIndicadorDto {
    id: string;
    mes_ano: string;//DateTime
    //exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
    //ATENCAO: Sempre usar esta configuracao, alterando apenas o mes e ano
    totalColabBateramMeta: number;
    totalColabBateramSuperMeta: number;
    totalColabBateramDesafio: number;
    totalColab: number;
    idIndicador: string;
}