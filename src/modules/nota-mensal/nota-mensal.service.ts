import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { NotaMensalDto } from './dto/nota-mensal.dto';


@Injectable()
export class NotaMensalService {
    constructor(private prisma: PrismaService) {}

    existeMes_Ano (idColaborador: string, mes: string, ano: string){
        
        const mesAno: string = `${ano}-${mes}-01T00:00:00.000Z`

        return this.prisma.notaMensalColaborador.findFirst({
          where: {
            idColaborador: idColaborador,
            mesAno: mesAno
          }
        })
    }

    existeMesAno (idColaborador: string, mesAno: string){
        
        

        return this.prisma.notaMensalColaborador.findFirst({
          where: {
            idColaborador: idColaborador,
            mesAno: mesAno
          }
        })
    }

    async create(data: NotaMensalDto) {

        //verificando se nota mensal já existe
       
        const notaMensalExiste = await this.existeMesAno(data.idColaborador, data.mesAno);
    
        if (notaMensalExiste) {
          throw new Error('Não é possível criar a mesma nota mensal.')
        }
    
        const notaMensal = await this.prisma.notaMensalColaborador.create({
          data
        })
    
        return notaMensal;
    }

    async findOne(idColaborador: string, mes: string, ano: string) {
        const notaMensalExiste = await this.existeMes_Ano(idColaborador, mes, ano);
    
        if (!notaMensalExiste) {
          throw new Error('Não é possível encontrar uma nota mensal que NÃO EXISTE.')
        }
    
        return notaMensalExiste;
    }

    async update(idColaborador: string, mes: string, ano: string, data: NotaMensalDto) {
        const notaMensalExiste = await this.existeMes_Ano(idColaborador, mes, ano);
    
        if (!notaMensalExiste) {
          throw new Error('Não é possível atualizar uma nota mensal que NÃO EXISTE.')
        }
        
        const id = notaMensalExiste.id;
  
        return await this.prisma.notaMensalColaborador.update({
          data,
          where: { 
            id,
           },
        })
    
        
    }

    //funcao Nice to Have
    /*
    async findTop3Best (idGestor: string, mes: string, ano: string){
    }
    */

}
