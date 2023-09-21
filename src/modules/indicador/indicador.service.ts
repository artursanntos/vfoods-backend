import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IndicadorDto } from './dto/indicador.dto';

@Injectable()
export class IndicadorService {

    constructor(private prisma: PrismaService) {}

    existe (nomeInd: string){
        //caso possa ter mais de um indicador -> fazer ajuste aqui
        return this.prisma.indicador.findFirst({
          where: {
            nome: nomeInd
          }
        })
      }

    async create(data: IndicadorDto) {

        //verificando se indicador já existe
       
        const indicadorExiste = await this.existe(data.nome);
    
        if (indicadorExiste) {
          throw new Error('Não é possível criar o mesmo indicador.')
        }
        
        
    
        const indicador = await this.prisma.indicador.create({
          data
        })
    
        return indicador;
      }

    async findOne(nomeInd: string) {
        const indicadorExiste = await this.existe(nomeInd);
    
        if (!indicadorExiste) {
          throw new Error('Não é possível encontrar um indicador que NÃO EXISTE.')
        }
    
        return indicadorExiste;
      }

    async findAllIndOfGest(emailGest: string){
        //por estar utilizando o gestor, taalvez essa fosse uma func de gestor.service
        //a menos que use o id de gestor ao inves do email
        
        //verificando se gestor existe
        const gestorExiste = await this.prisma.gestor.findFirst({
            where: {
              email: emailGest
            }
        })

        if (!gestorExiste) {
            throw new Error('Não é possível localizar indicadores de um gestor que NÃO EXISTE.')
        }

        const id = gestorExiste.id;

        return this.prisma.indicador.findMany({
              where: {
                  idGestor: id
              }
        })
    }

    async remove(nome: string) {
        const indicadorExiste = await this.existe(nome);

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

}
