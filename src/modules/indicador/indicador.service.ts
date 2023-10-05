import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IndicadorDto } from './dto/indicador.dto';
import { Indicador } from '@prisma/client';
import { log } from 'console';

@Injectable()
export class IndicadorService {

    constructor(private prisma: PrismaService) {}

    existe (nomeInd: string,idGestor: string){
        
        return this.prisma.indicador.findFirst({
          where: {
            nome: nomeInd,
            idGestor: idGestor
          }
        })
      }

    mes_anoAtual () :string{
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();
      const mesAtual = dataAtual.getMonth()+1;
      if (mesAtual < 10) {
        return (anoAtual+'-0'+mesAtual+'-01T00:00:00.000Z');
      }else{
        return (anoAtual+'-'+mesAtual+'-01T00:00:00.000Z');
      } 
    }

    listaMes_anoAteDeadLine (deadLine: string): string[] {
      //tenho que colocar todos os mes_ano  ate a dead line em um array 
      const mes_anoDeadLine = (deadLine.substring(0, 9))+'01T00:00:00.000Z';
      var mes_ano = this.mes_anoAtual();
      var chegouDead = false;
      const meses_anos: string[] = []

      while (!chegouDead){
        if (mes_ano == mes_anoDeadLine) {
          chegouDead=true;
        }
        meses_anos.push(mes_ano)
        //prox mes e ano
        var ano = parseInt(mes_ano.substring(0, 5));
        var mes = parseInt(mes_ano.substring(5, 8));
        if (mes==12) {
          ano++;
          mes=0;
        }
        mes++;
        if (mes < 10) {
          mes_ano = ano+'-0'+mes+'-01T00:00:00.000Z';
        }else{
          mes_ano = ano+'-'+mes+'-01T00:00:00.000Z';
        }
      }

      return meses_anos;


    }

    async create(data: IndicadorDto) {

        //verificando se indicador já existe
       
        const indicadorExiste = await this.existe(data.nome, data.idGestor);
    
        if (indicadorExiste) {
          throw new Error('Não é possível criar o mesmo indicador.')
        }
        
        
    
        const indicador = await this.prisma.indicador.create({
          data
        })
        //Eh preciso criar um coborador-indicador para cada mes_ano ate a dead_line

    
        return indicador;
      }

    async findOne(nomeInd: string, idGestor: string) {
        const indicadorExiste = await this.existe(nomeInd, idGestor);
    
        if (!indicadorExiste) {
          throw new Error('Não é possível encontrar um indicador que NÃO EXISTE.')
        }
    
        return indicadorExiste;
      }

    async findOneById(id: string) {
      const indicador = this.prisma.indicador.findFirst({
        where:{
          id: id
        }
      })

      if (!indicador) {
        throw new Error('Não é possível encontrar um indicador que NÃO EXISTE.')
      }
      return indicador;
    }

    async findAllIndOfGest(idGestor: string){

        return this.prisma.indicador.findMany({
              where: {
                  idGestor: idGestor
              }
        })
    }

    async remove(nomeInd: string, idGestor: string) {
        const indicadorExiste = await this.existe(nomeInd, idGestor);

        if (!indicadorExiste) {
          throw new Error('Não é possível remover um indicador que NÃO EXISTE.')
        }

        const id = indicadorExiste.id; 
    
        return await this.prisma.indicador.delete({
          where: {
            id,
          }
        })
    
    }

    async update(nomeInd: string, idGestor:string, data: IndicadorDto) {
      const indicadorExiste = await this.existe(nomeInd,idGestor);
  
      if (!indicadorExiste) {
        throw new Error('Não é possível atualizar um indicador que NÃO EXISTE.')
      }
      
      const id = indicadorExiste.id;

      return await this.prisma.indicador.update({
        data,
        where: { 
          id,
         },
      })
  
      
    }

}
