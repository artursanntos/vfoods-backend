import { Module } from '@nestjs/common';
import { GestorController } from './gestor.controller';
import { GestorService } from './gestor.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    controllers: [GestorController],
    providers: [GestorService, PrismaService],
})
export class GestorModule {}
