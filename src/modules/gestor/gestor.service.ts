import { Injectable } from '@nestjs/common';
import { GestorDto } from './dto/gestor.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GestorService {

    constructor(private prisma: PrismaService) {}

    existe (email: string){
        return this.prisma.gestor.findFirst({
          where: {
            email: email
          }
        })
      }

    async create(data: GestorDto) {

        //verificando se gestor já existe
       
        const gestorExiste = await this.existe(data.email);
    
        if (gestorExiste) {
          throw new Error('Não é possível criar o mesmo gestor.')
        }
        
        
    
        const gestor = await this.prisma.gestor.create({
          data
        })
    
        return gestor;
      }

    async findOne(email: string) {
        const gestorExiste = await this.existe(email);
    
        if (!gestorExiste) {
          throw new Error('Não é possível encontrar um gestor que NÃO EXISTE.')
        }
    
        return gestorExiste;
      }

    async remove(email: string) {
        const gestorExiste = await this.existe(email);

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
    async findAllColFromOne (email: string){
        const gestorExiste = await this.existe(email);

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
