import { IsDate, IsNotEmpty, IsNumber, isDate, isNotEmpty } from "class-validator"

export class CriarColaboradorIndicadorDto {
    @IsDate()
    @IsNotEmpty()
    mes_ano: Date;

    @IsNumber()
    @IsNotEmpty()
    meta: number;

    @IsNumber()
    @IsNotEmpty()
    superMeta: number;

    @IsNumber()
    @IsNotEmpty()
    desafio: number;

    @IsNumber()
    @IsNotEmpty()
    peso: number;

    @IsNumber()
    resultado: number;

    @IsNumber()
    notaIndicador: number;
}