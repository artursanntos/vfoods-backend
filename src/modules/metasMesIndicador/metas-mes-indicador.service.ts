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

    

}
