import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ColaboradorDTO } from './dto/create-colaborador.dto';

@Injectable()
export class ColaboradorService {

    constructor(private prisma: PrismaService) {}
    
    emailExiste(email: string) {
        return this.prisma.colaborador.findUnique({
            where: {
                email: email,
            }
        })
    }

    idExiste(id: string) {
        return this.prisma.colaborador.findUnique({
            where: {
                id: id,
            }
        })
    }

    async create(data: ColaboradorDTO): Promise<ColaboradorDTO> {
        const colaboradorExists = await this.emailExiste(data.email);

        if (colaboradorExists) {
            throw new Error('Um colaborador com este email já foi criado.')
        }

        return await this.prisma.colaborador.create({
            data,
        })
    }

    async delete(id: string): Promise<ColaboradorDTO> {
        const colaboradorExists = await this.idExiste(id);

        if (!colaboradorExists) {
            throw new Error('Este colaborador não foi encontrado.')
        }

        return await this.prisma.colaborador.delete({
            where: {
                id: id,
            }
        })
    }

    async update(id: string, data: ColaboradorDTO): Promise<ColaboradorDTO> {
        const colaboradorExists = await this.idExiste(id);

        if (!colaboradorExists) {
            throw new Error('Este colaborador não foi encontrado.')
        }

        return await this.prisma.colaborador.update({
            data,
            where: {
                id: id,
            },
        })
    }

    async findOne(id: string): Promise<ColaboradorDTO> {
        const colaboradorExists = await this.idExiste(id);

        if (!colaboradorExists) {
            throw new Error('Este colaborador não foi encontrado.')
        }

        return colaboradorExists;
    }

    async findOneByEmail(email: string): Promise<ColaboradorDTO> {
        const colaboradorExists = await this.emailExiste(email);

        if (!colaboradorExists) {
            throw new Error('Colaborador com email fornecido não foi encontrado.')
        }

        return colaboradorExists;
    }
    
    async findAll() {
        return this.prisma.colaborador.findMany();
    }
}
