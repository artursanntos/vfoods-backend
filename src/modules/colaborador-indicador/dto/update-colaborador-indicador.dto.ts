import { PartialType } from "@nestjs/swagger";
import { CriarColaboradorIndicadorDto } from "./criar-colaborador-indicador.dto";

export class UpdateColaboradorIndicador extends PartialType(CriarColaboradorIndicadorDto) {}