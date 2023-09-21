import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IndicadorController } from './indicador.controller';
import { IndicadorService } from './indicador.service';

@Module({
    controllers: [IndicadorController],
    providers: [IndicadorService, PrismaService],
})
export class IndicadorModule {}
