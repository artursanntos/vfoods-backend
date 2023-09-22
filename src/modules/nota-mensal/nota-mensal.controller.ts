import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotaMensalService } from './nota-mensal.service';
import { NotaMensalDto } from './dto/nota-mensal.dto';

@Controller('nota-mensal')
export class NotaMensalController {
    constructor(private readonly notaMensalService: NotaMensalService) {}

    //criar nota mensal
    @Post()
    async create(@Body() data: NotaMensalDto){
        return this.notaMensalService.create(data);
    }
    
    //pegar nota mensal
    @Get(':idColaborador/:mes/:ano')
    async findOne(@Param('idColaborador') idColaborador: string, @Param('mes') mes: string, @Param('ano') ano: string) {
      return this.notaMensalService.findOne(idColaborador, mes, ano);
    }

    //updade nota mensal
    @Put(":idColaborador/:mes/:ano")
    async update(@Param('idColaborador') idColaborador: string, @Param('mes') mes: string, @Param('ano') ano: string, @Body() data:NotaMensalDto) {
      return this.notaMensalService.update(idColaborador, mes, ano, data);
    }

    //pegar top3 maiores notas mensais
    //Nice to Have
    /*
    @Get('top3Best/:idGestor/:mes/:ano')
    async findTop3Best(@Param('idGestor') idGestor: string, @Param('mes') mes: string, @Param('ano') ano: string) {
      return this.notaMensalService.findTop3Best(idGestor, mes, ano);
    }
    */
}
