import { Module } from '@nestjs/common';
import { ColaboradorController } from './colaborador.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ColaboradorService } from './colaborador.service';

@Module({
    controllers: [ColaboradorController],
    providers: [ColaboradorService, PrismaService],
})
export class ColaboradorModule {}
