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
    @Get(':nomeInd')//atencao: pode haver mais de um indicador com msm nome e com dead line dif?
    async findOne(@Param('nomeInd') nomeInd: string) {
      return this.indicadorService.findOne(nomeInd);
    }

    //pegar todos indicadores de um gestor
    @Get('/indicadoresDoGestor/:emailGest')
    async findAllColFromOne(@Param('emailGest') emailGest: string) {
      return this.indicadorService.findAllIndOfGest(emailGest);
    }

    //excluir indicador
    @Delete(':nomeInd')
    async remove(@Param('nomeInd') nomeInd: string) {
      return this.indicadorService.remove(nomeInd);
    }

    @Put(":nome")
    async update(@Param("nome") nome:string, @Body() data:IndicadorDto) {
      return this.indicadorService.update(nome, data);
    }

}
