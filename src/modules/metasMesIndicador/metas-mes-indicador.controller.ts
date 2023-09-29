import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MetasMesIndicadorService } from './metas-mes-indicador.service';
import { MetasMesIndicadorDto } from './dto/MetasMesIndicadorDto';



@Controller('metas-mes-indicador')
export class MetasMesIndicadorController {
    constructor(private readonly metasMesIndicadorService: MetasMesIndicadorService) {}

    //criar mmi
    @Post()
    async create(@Body() data: MetasMesIndicadorDto){
        return this.metasMesIndicadorService.create(data);
    }
    
    //pegar mmi
    @Get(':idIndicador/:mes/:ano')
    async findOne(@Param('idIndicador') idIndicador: string, @Param('mes') mes: string, @Param('ano') ano: string) {
      return this.metasMesIndicadorService.findOne(idIndicador, mes, ano);
    }

    //updade mmi
    @Put(':idIndicador/:mes/:ano')
    async update(@Param('idIndicador') idIndicador: string, @Param('mes') mes: string, @Param('ano') ano: string, @Body() data:MetasMesIndicadorDto) {
      return this.metasMesIndicadorService.update(idIndicador, mes, ano, data);
    }

  //para adicionar um colaborador pode ser criada uma funcao que sumarise fazer um get e um update para os dados de dados
  // de total de colaboradores e total de colaboradores que bateram cada meta

    
}
