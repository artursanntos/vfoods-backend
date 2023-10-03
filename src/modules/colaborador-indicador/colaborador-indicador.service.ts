import { Injectable } from '@nestjs/common';
import { CriarColaboradorIndicadorDto } from './dto/criar-colaborador-indicador.dto';
import { ColaboradorIndicador, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateColaboradorIndicadorDto } from './dto/update-colaborador-indicador.dto';

@Injectable()
export class ColaboradorIndicadorService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CriarColaboradorIndicadorDto,
  ): Promise<ColaboradorIndicador> {
    const colaboradorIndicador = this.prisma.colaboradorIndicador.create({
      data,
    });

    return colaboradorIndicador;
  }

  async update(
    id: string,
    updateData: UpdateColaboradorIndicadorDto,
  ): Promise<ColaboradorIndicador> {
    return this.prisma.colaboradorIndicador.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<ColaboradorIndicador> {
    return this.prisma.colaboradorIndicador.delete({
      where: { id },
    });
  }

  async findOne(id: string): Promise<ColaboradorIndicador> {
    return this.prisma.colaboradorIndicador.findUnique({
      where: { id },
    });
  }

  async findAllOfColaborator(
    idColaborador: string,
  ): Promise<ColaboradorIndicador[]> {
    return this.prisma.colaboradorIndicador.findMany({
      where: { idColaborador },
    });
  }

  async findAllOfColaboratorByMonth(
    idColaborador: string,
    mes: string,
  ): Promise<ColaboradorIndicador[]> {
    return this.prisma.colaboradorIndicador.findMany({
      where: {
        idColaborador: idColaborador,
        mes_ano: mes,
      },
    });
  }
}
