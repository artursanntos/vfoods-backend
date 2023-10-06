import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CriarColaboradorIndicadorDto } from './dto/criar-colaborador-indicador.dto';
import { UpdateColaboradorIndicadorDto } from './dto/update-colaborador-indicador.dto';
import { ColaboradorIndicadorService } from './colaborador-indicador.service';

@Controller('colaborador-indicador/')
export class ColaboradorIndicadorController {
  constructor(
    private readonly colaboradorIndicadorService: ColaboradorIndicadorService,
  ) {}

  @Post()
  create(@Body() createColaboradorIndicadorDto: CriarColaboradorIndicadorDto) {
    return this.colaboradorIndicadorService.create(
      createColaboradorIndicadorDto,
    );
  }

  @Post('createMany/:dataDeadLine')
  createMany(
    @Param('dataDeadLine') dataDeadLine: string,
    @Body() createColaboradorIndicadorDto: CriarColaboradorIndicadorDto) {
    return this.colaboradorIndicadorService.createMany(createColaboradorIndicadorDto, dataDeadLine);
  }

  @Patch(':idColaboradorIndicador')
  async updateColaboradorIndicador(
    @Param('idColaboradorIndicador') id: string,
    @Body() updateColaboradorIndicadorDto: UpdateColaboradorIndicadorDto,
  ) {
    const updatedColaboradorIndicador =
      await this.colaboradorIndicadorService.update(
        id,
        updateColaboradorIndicadorDto,
      );

    if (!updatedColaboradorIndicador) {
      throw new NotFoundException('ColaboradorIndicador not found');
    }

    return {
      message: 'ColaboradorIndicador updated successfully',
      updatedColaboradorIndicador,
    };
  }

  @Delete(':idColaboradorIndicador')
  async deleteColaboradorIndicador(
    @Param('idColaboradorIndicador') id: string,
  ) {
    const deletedColaboradorIndicador =
      await this.colaboradorIndicadorService.remove(id);
    if (!deletedColaboradorIndicador) {
      throw new NotFoundException('ColaboradorIndicador not found');
    }
    return { message: 'ColaboradorIndicador deleted successfully' };
  }

  @Get(':idColaboradorIndicador')
  async findOne(@Param('idColaboradorIndicador') id: string) {
    const colaboradorIndicador =
      await this.colaboradorIndicadorService.findOne(id);
    if (!colaboradorIndicador) {
      throw new NotFoundException('ColaboradorIndicador not found');
    }
    return { colaboradorIndicador };
  }

  @Get('/findAllOfColaborator/:idColaborador')
  async findAllOfColaborator(@Param('idColaborador') id: string) {
    const colaboradorIndicadores =
      await this.colaboradorIndicadorService.findAllOfColaborator(id);
    if (!colaboradorIndicadores) {
      throw new NotFoundException('ColaboradorIndicadores not found');
    }
    return { colaboradorIndicadores };
  }

  @Get('/findAllOfIndicator/:idIndicador')
  async findAllOfIndicator(@Param('idIndicador') id: string) {
    const colaboradorIndicadores =
      await this.colaboradorIndicadorService.findAllOfIndicator(id);
    if (!colaboradorIndicadores) {
      throw new NotFoundException('ColaboradorIndicadores not found');
    }
    return { colaboradorIndicadores };
  }

  @Get('/findAllOfIndicatorByMonth/:idIndicador/:mes')
  async findAllOfIndicatorByMonth(
    @Param('idIndicador') id: string,
    @Param('mes') mes: string,
  ) {
    const colaboradorIndicadores =
      await this.colaboradorIndicadorService.findAllOfIndicatorByMonth(
        id,
        mes,
      );
    if (!colaboradorIndicadores) {
      throw new NotFoundException('ColaboradorIndicadores not found');
    }
    return { colaboradorIndicadores };
  }

  @Get('/findAllOfColaboratorByMonth/:idColaborador/:mes')
  async findAllOfColaboratorByMonth(
    @Param('idColaborador') id: string,
    @Param('mes') mes: string,
  ) {
    const colaboradorIndicadores =
      await this.colaboradorIndicadorService.findAllOfColaboratorByMonth(
        id,
        mes,
      );
    if (!colaboradorIndicadores) {
      throw new NotFoundException('ColaboradorIndicadores not found');
    }
    return { colaboradorIndicadores };
  }


  //em um unico meses
  @Get('/getPercentualDeMetasPorIndicadorPorMes/:idIndicador/:date')
  async getPercentualDeMetasPorIndicadorPorMes(
    @Param('idIndicador') id: string,
    @Param('date') date: string,
  ) {
    return await this.colaboradorIndicadorService.getPercentualDeMetasPorIndicadorPorMes(id, date);
  }


  //intervalo de 6 meses
  @Get('/getPercentualDeMetasBatidasLastXMonths/:idColaborador/:date')

  async getPercentualDeMetasBatidasLast6Months(
    @Param('idColaborador') id: string,
    @Param('date') date: string,
  ) {

    return await this.colaboradorIndicadorService.getPercentualDeMetasBatidasLastXMonths(id, date);
  }

  //intervalo de X(=interval) meses
  @Get('/getPercentualDeMetasBatidasLastXMonths/:idColaborador/:date/:interval')
  async getPercentualDeMetasBatidasLastXMonths(
    @Param('idColaborador') id: string,
    @Param('date') date: string,
    @Param('interval') interval: number,
  ) {
    return await this.colaboradorIndicadorService.getPercentualDeMetasBatidasLastXMonths(id, date, interval);

  }

}
