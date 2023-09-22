import { Module } from '@nestjs/common';
import { NotaMensalController } from './nota-mensal.controller';
import { NotaMensalService } from './nota-mensal.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    controllers: [NotaMensalController],
    providers: [NotaMensalService, PrismaService],
})
export class NotaMensalModule {}
