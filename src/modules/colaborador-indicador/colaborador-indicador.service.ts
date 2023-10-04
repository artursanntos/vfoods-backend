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

  async findAllOfIndicator(
    idIndicador: string,
  ): Promise<ColaboradorIndicador[]> {
    return this.prisma.colaboradorIndicador.findMany({
      where: { idIndicador },
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


  async getPercentualDeMetasBatidasPorMes(idColaborador: string, mes_ano: string): Promise<number[]>{

    const todosColabIndByMonth = await this.findAllOfColaboratorByMonth(idColaborador, mes_ano);

    const totalIndicadoresNoMes = todosColabIndByMonth.length;

    var ano = parseInt(mes_ano.substring(0, 5));
    var mes = parseInt(mes_ano.substring(5, 8));

    const metaSmetaDesafio:number[]=[0,0,0, ano, mes];

    todosColabIndByMonth.forEach(colabInd => {
      if (colabInd.resultado >= colabInd.desafio) {
        metaSmetaDesafio[0]++;
        metaSmetaDesafio[1]++;
        metaSmetaDesafio[2]++;
      } else if (colabInd.resultado >= colabInd.superMeta) {
        metaSmetaDesafio[0]=+1;
        metaSmetaDesafio[1]=+1;
      } else if (colabInd.resultado >= colabInd.meta) {
        metaSmetaDesafio[0]=+1;
      }
    });

    const pescentualMetaSmetaDesafio: number[] = [
      metaSmetaDesafio[0]/totalIndicadoresNoMes,
      metaSmetaDesafio[1]/totalIndicadoresNoMes,
      metaSmetaDesafio[2]/totalIndicadoresNoMes,
    ]

    return metaSmetaDesafio;
    
  }

  findLast6Mounths (mes_ano: string): string[] {
//exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
    var ano = parseInt(mes_ano.substring(0, 5));
    var mes = parseInt(mes_ano.substring(5, 8));

    const complementoData = mes_ano.substring(7);

    const last6Mounths: string[] = [mes_ano];

    for (let index = 0; index < 5; index++) {
      if (mes===1) {
        mes=13;
        ano--;
      }

      mes--;
      if (mes<10) {
        last6Mounths.push(ano+'-0'+mes+complementoData);
      }else{
        last6Mounths.push(ano+'-'+mes+complementoData);
      }
      
    }

    return last6Mounths;

  }

  async getPercentualDeMetasBatidasLast6Mounths(idColaborador: string, mes_ano: string){

    const last6Mounths = this.findLast6Mounths(mes_ano);
    /*
    const percentualDeMetasBatidasLast6Mounths:number[][] = []

    last6Mounths.forEach(async data => {
      const aux = await this.getPercentualDeMetasBatidasPorMes(idColaborador, data);
      console.log(aux)
      percentualDeMetasBatidasLast6Mounths.push(aux);
      
    });
    */

    const promises = last6Mounths.map(async (data) => {
      const aux = await this.getPercentualDeMetasBatidasPorMes(idColaborador, data);
      
      return aux;
    });

    const percentualDeMetasBatidasLast6Mounths = await Promise.all(promises);

    return percentualDeMetasBatidasLast6Mounths;
  }

}
