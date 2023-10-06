import { Module } from '@nestjs/common';
import { GestorController } from './gestor.controller';
import { GestorService } from './gestor.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [
        GestorModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2d' },
          }),
    ],
    controllers: [GestorController],
    providers: [GestorService, PrismaService],
})
export class GestorModule {}
