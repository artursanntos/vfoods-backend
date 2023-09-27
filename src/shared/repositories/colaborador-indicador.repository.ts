import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ColaboradorIndicadorRepository {

    constructor (private readonly prismaService: PrismaService) {}

    create (createColaboradorIndicadorDto: Prisma.ColaboradorIndicadorCreateArgs) {
        return this.prismaService.colaboradorIndicador.create(createColaboradorIndicadorDto)
    }

    findAll (findAllDto: Prisma.ColaboradorIndicadorFindManyArgs) {
        return this.prismaService.colaboradorIndicador.findMany(findAllDto)
    }

    findUnique (findUniqueDto: Prisma.ColaboradorIndicadorFindUniqueArgs) {
        return this.prismaService.colaboradorIndicador.findUnique (findUniqueDto)
    }

    update (updateColaboradorIndicadorDto: Prisma.ColaboradorIndicadorUpdateArgs) {
        return this.prismaService.colaboradorIndicador.update (updateColaboradorIndicadorDto)
    }

    delete (deleteColaboradorIndicadorDto: Prisma.ColaboradorIndicadorDeleteArgs) {
        return this.prismaService.colaboradorIndicador.delete (deleteColaboradorIndicadorDto)
    }
}