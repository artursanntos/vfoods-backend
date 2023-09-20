import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GestorDto } from './dto/gestor.dto';
import { GestorService } from './gestor.service';

@Controller('gestor')
export class GestorController {
    constructor(private readonly gestorService: GestorService) {}

    //criar gestor
    @Post()
    async create(@Body() data: GestorDto){
        return this.gestorService.create(data);
    }

    //pegar gestor
    @Get(':nome')
    async findOne(@Param('nome') nome: string) {
      return this.gestorService.findOne(nome);
    }

    //excluir gestor
    @Delete(':nome')
    async remove(@Param('nome') nome: string) {
      return this.gestorService.remove(nome);
    }

    //pegar colaboradores do gestor
    @Get('/colaboradores/:nome')
    async findAllColFromOne(@Param('nome') nome: string) {
      return this.gestorService.findAllColFromOne(nome);
    }

}
