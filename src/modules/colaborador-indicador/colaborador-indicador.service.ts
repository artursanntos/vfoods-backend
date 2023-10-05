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

    const metaSmetaDesafio:number[]=[
      0, //numMetasBatidas
      0, //numSuperMetasBatidas 
      0, //numDesafiosBatidos
      ano, mes];

    todosColabIndByMonth.forEach(colabInd => {
      if (colabInd.resultado >= colabInd.desafio) {
        metaSmetaDesafio[0]++;
        metaSmetaDesafio[1]++;
        metaSmetaDesafio[2]++;
      } else if (colabInd.resultado >= colabInd.superMeta) {
        metaSmetaDesafio[0]++;
        metaSmetaDesafio[1]++;
      } else if (colabInd.resultado >= colabInd.meta) {
        metaSmetaDesafio[0]++;
      }
    });

    const pescentualMetaSmetaDesafio: number[] = [
      metaSmetaDesafio[0]/totalIndicadoresNoMes,
      metaSmetaDesafio[1]/totalIndicadoresNoMes,
      metaSmetaDesafio[2]/totalIndicadoresNoMes,
      metaSmetaDesafio[3],
      metaSmetaDesafio[4]
    ]

    return pescentualMetaSmetaDesafio;
    
  }


  findLastXMonths (mes_ano: string, x?: number): string[] {
    //exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
        var ano = parseInt(mes_ano.substring(0, 5));
        var mes = parseInt(mes_ano.substring(5, 8));
        if(x === undefined){
          x=6;
        }
        const complementoData = mes_ano.substring(7);
    
        const lastXMonths: string[] = [mes_ano];
    
        for (let index = 0; index < (x-1); index++) {
          if (mes===1) {
            mes=13;
            ano--;
          }
    
          mes--;
          if (mes<10) {
            lastXMonths.push(ano+'-0'+mes+complementoData);
          }else{
            lastXMonths.push(ano+'-'+mes+complementoData);
          }
          
        }
        
        return lastXMonths;
    
      }

  async getPercentualDeMetasBatidasLastXMonths(idColaborador: string, mes_ano: string, x?: number){
    
    if(x === undefined){
      x=6;
    }

    const lastXMonths = this.findLastXMonths(mes_ano, x);

    /*
    const percentualDeMetasBatidasLast6Months:number[][] = []

    last6Months.forEach(async data => {
      const aux = await this.getPercentualDeMetasBatidasPorMes(idColaborador, data);
      console.log(aux)
      percentualDeMetasBatidasLast6Months.push(aux);
      
    });
    */


    const promises = lastXMonths.map(async (data) => {

      const aux = await this.getPercentualDeMetasBatidasPorMes(idColaborador, data);
      
      return aux;
    });

    const percentualDeMetasBatidasLast6Months = await Promise.all(promises);

    return percentualDeMetasBatidasLast6Months;
  }

}
