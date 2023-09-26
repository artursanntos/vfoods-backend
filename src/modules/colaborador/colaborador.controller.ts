import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorDTO } from './dto/create-colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private readonly colaboradorService: ColaboradorService) {}

    // criar colaborador
    @Post()
    async create(@Body() data: ColaboradorDTO){
        return this.colaboradorService.create(data);
    }

    // delete colaborador
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.colaboradorService.delete(id);
    }

    // atualizar colaborador
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: ColaboradorDTO){
        return this.colaboradorService.update(id, data);
    }

    // pegar colaborador
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.colaboradorService.findOne(id);
    }

    // pegar todos os colaboradores
    @Get()
    async findAll() {
      return this.colaboradorService.findAll();
    }
}
