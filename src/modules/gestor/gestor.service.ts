import { Injectable } from '@nestjs/common';
import { GestorDto } from './dto/gestor.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GestorService {

    constructor(private prisma: PrismaService) {}

    existe (nome: string){
        return this.prisma.gestor.findFirst({
          where: {
            nome: nome
          }
        })
      }

    async create(data: GestorDto) {

        //verificando se gestor já existe
       
        const gestorExiste = await this.existe(data.nome);
    
        if (gestorExiste) {
          throw new Error('Não é possível criar o mesmo gestor.')
        }
        
        
    
        const gestor = await this.prisma.gestor.create({
          data
        })
    
        return gestor;
      }

    async findOne(nome: string) {
        const gestorExiste = await this.existe(nome);
    
        if (!gestorExiste) {
          throw new Error('Não é possível encontrar um gestor que NÃO EXISTE.')
        }
    
        return gestorExiste;
      }

    async remove(nome: string) {
        const gestorExiste = await this.existe(nome);

        if (!gestorExiste) {
          throw new Error('Não é possível remover um gestor que NÃO EXISTE.')
        }

        const id = gestorExiste.id; 
    
        return await this.prisma.gestor.delete({
          where: {
            id,
          }
        })
    
      }
      //dar mais atencao nos testes
    async findAllColFromOne (nome: string){
        const gestorExiste = await this.existe(nome);

        if (!gestorExiste) {
          throw new Error('Não é localizar colaboradores de um gestor que NÃO EXISTE.')
        }

        const id = gestorExiste.id;

        return this.prisma.colaborador.findMany({
            where: {
                idGestor: id
            }
          })

    }

}
