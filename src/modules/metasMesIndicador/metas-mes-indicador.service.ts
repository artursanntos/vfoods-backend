import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MetasMesIndicadorDto } from './dto/MetasMesIndicadorDto';



@Injectable()
export class MetasMesIndicadorService {
    constructor(private prisma: PrismaService) {}

    existeMes_Ano (idIndicador: string, mes: string, ano: string){
        
        const mesAno: string = `${ano}-${mes}-01T00:00:00.000Z`

        return this.prisma.metasMesIndicador.findFirst({
          where: {
            idIndicador: idIndicador,
            mes_ano: mesAno
          }
        })
    }

    existeMesAno (idIndicador: string, mesAno: string){
        
        

        return this.prisma.metasMesIndicador.findFirst({
          where: {
            idIndicador: idIndicador,
            mes_ano: mesAno
          }
        })
    }

    async create(data: MetasMesIndicadorDto) {

        //verificando se MetasMesIndicador já existe
       
        const mmiExiste = await this.existeMesAno(data.idIndicador, data.mes_ano);
    
        if (mmiExiste) {
          throw new Error('Não é possível criar, já existe uma linha em MetasMesIndicadorDto com o emsmo MesAno e o mesmo indicador.')
        }
    
        const mmi = await this.prisma.metasMesIndicador.create({
          data
        })
    
        return mmi;
    }

    async findOne(idIndicador: string, mes: string, ano: string) {
        const mmiExiste = await this.existeMes_Ano(idIndicador, mes, ano);
    
        if (!mmiExiste) {
          throw new Error('Não é possível encontrar uma linha em MetaMesIndicador que NÃO EXISTE.')
        }
    
        return mmiExiste;
    }

    async findAllMeses(idIndicador: string) {
      
      const mmi = await this.prisma.metasMesIndicador.findMany({
        where: {
          idIndicador: idIndicador
      }
      })

      var meses:Date[]=[];
      var metas:number[]=[];
      var superMetas:number[]=[];
      var desafio:number[]=[];

      mmi.forEach(element => {
        meses.push(element.mes_ano);
        metas.push(element.totalColabBateramMeta);
        superMetas.push(element.totalColabBateramSuperMeta);
        desafio.push(element.totalColabBateramDesafio);
      });
  
      return [meses,metas,superMetas,desafio];
  }

    async update(idIndicador: string, mes: string, ano: string, data: MetasMesIndicadorDto) {
        const mmiExiste = await this.existeMes_Ano(idIndicador, mes, ano);
    
        if (!mmiExiste) {
          throw new Error('Não é possível atualizar uma linha em MetaMesIndicador que NÃO EXISTE.')
        }
        
        const id = mmiExiste.id;
  
        return await this.prisma.metasMesIndicador.update({
          data,
          where: { 
            id,
           },
        })
    
        
    }

    async findAllByInterval(mes_ano: string, intervalo: number) {
      
    const mesesParaAnalise = this.findLastXMonths (mes_ano, intervalo);


      var meses:Date[]=[];
      var metas:number[]=[];
      var superMetas:number[]=[];
      var desafio:number[]=[];
      // é necessário o mmi de mais de um indicador para testar com segurança
      
      const promises = mesesParaAnalise.map(async (data) => {
        const mmi = await this.prisma.metasMesIndicador.findMany({
          where: {
            mes_ano: data
        }
        })
        
        meses.push(mmi[0].mes_ano);
        var sumMetas=0;
        var sumSuperMetas=0;
        var sumDesafio=0;

        mmi.forEach(element => {
           sumMetas+=element.totalColabBateramMeta;
           sumSuperMetas+=element.totalColabBateramSuperMeta;
           sumDesafio+=element.totalColabBateramDesafio;
          
        });
        metas.push(sumMetas);
        superMetas.push(sumSuperMetas);
        desafio.push(sumDesafio);
        
      });
       
      await Promise.all(promises)
  
      return [meses,metas,superMetas,desafio];
  }


  findLastXMonths (mes_ano: string, x: number): string[] {
    //exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
        var ano = parseInt(mes_ano.substring(0, 5));
        var mes = parseInt(mes_ano.substring(5, 8));
    
        const complementoData = mes_ano.substring(7);
    
        const last6Months: string[] = [mes_ano];
    
        for (let index = 0; index < (x-1); index++) {
          if (mes===1) {
            mes=13;
            ano--;
          }
    
          mes--;
          if (mes<10) {
            last6Months.push(ano+'-0'+mes+complementoData);
          }else{
            last6Months.push(ano+'-'+mes+complementoData);
          }
          
        }
        
        return last6Months;
    
      }

}
