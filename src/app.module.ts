import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { ColaboradorModule } from './modules/colaborador/colaborador.module';
import { ColaboradorIndicadorModule } from './modules/colaborador-indicador/colaborador-indicador.module';
import { GestorModule } from './modules/gestor/gestor.module';
import { IndicadorModule } from './modules/indicador/indicador.module';
import { NotaMensalModule } from './modules/nota-mensal/nota-mensal.module';

@Module({
  imports: [
    ColaboradorModule,
    ColaboradorIndicadorModule,
    GestorModule,
    IndicadorModule,
    NotaMensalModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
