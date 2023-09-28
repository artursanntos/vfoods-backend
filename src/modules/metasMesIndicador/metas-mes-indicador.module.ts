import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MetasMesIndicadorService } from './metas-mes-indicador.service';
import { MetasMesIndicadorController } from './metas-mes-indicador.controller';

@Module({
    controllers: [MetasMesIndicadorController],
    providers: [MetasMesIndicadorService, PrismaService],
})
export class MetasMesIndicadorModule {}
