import { PartialType } from "@nestjs/swagger";
import { CriarColaboradorIndicadorDto } from "./criar-colaborador-indicador.dto";

export class UpdateColaboradorIndicadorDto extends PartialType(CriarColaboradorIndicadorDto) {}