import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { IndicadorDto } from './dto/indicador.dto';

@Controller('indicador')
export class IndicadorController {
    constructor(private readonly indicadorService: IndicadorService) {}

    //criar indicador para gestor
    @Post()
    async create(@Body() data: IndicadorDto){
        return this.indicadorService.create(data);
    }

    //pegar indicador      
    @Get(':idGestor/:nomeInd')
    async findOne(@Param('nomeInd') nomeInd: string,@Param('idGestor') idGestor: string) {
      return this.indicadorService.findOne(nomeInd,idGestor);
    }

    //pegar todos indicadores de um gestor
    @Get('/:idGestor')
    async findAllColFromOne(@Param('idGestor') idGestor: string) {
      return this.indicadorService.findAllIndOfGest(idGestor);
    }

    //excluir indicador
    @Delete(':idGestor/:nomeInd')
    async remove(@Param('nomeInd') nomeInd: string,@Param('idGestor') idGestor: string) {
      return this.indicadorService.remove(nomeInd,idGestor);
    }

    //updade indicador
    @Put(":idGestor/:nomeInd")
    async update(@Param('nomeInd') nomeInd: string,@Param('idGestor') idGestor: string, @Body() data:IndicadorDto) {
      return this.indicadorService.update(nomeInd, idGestor, data);
    }

}
