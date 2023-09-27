import { Module } from '@nestjs/common';
import { ColaboradorIndicadorController } from './colaborador-indicador.controller';
import { ColaboradorIndicadorService } from './colaborador-indicador.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    controllers: [ColaboradorIndicadorController],
    providers: [ColaboradorIndicadorService, PrismaService]

})
export class ColaboradorIndicadorModule {}
