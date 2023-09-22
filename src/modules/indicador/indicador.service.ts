import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IndicadorDto } from './dto/indicador.dto';

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

    async create(data: IndicadorDto) {

        //verificando se indicador já existe
       
        const indicadorExiste = await this.existe(data.nome, data.idGestor);
    
        if (indicadorExiste) {
          throw new Error('Não é possível criar o mesmo indicador.')
        }
        
        
    
        const indicador = await this.prisma.indicador.create({
          data
        })
    
        return indicador;
      }

    async findOne(nomeInd: string, idGestor: string) {
        const indicadorExiste = await this.existe(nomeInd, idGestor);
    
        if (!indicadorExiste) {
          throw new Error('Não é possível encontrar um indicador que NÃO EXISTE.')
        }
    
        return indicadorExiste;
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
