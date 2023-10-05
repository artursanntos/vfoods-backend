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

@Controller('colaborador-indicador')
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

  @Get('/getPercentualDeMetasBatidasLast6Mounths/:idColaborador/:date')
  async getPercentualDeMetasBatidasLast6Mounths(
    @Param('idColaborador') id: string,
    @Param('date') date: string,
  ) {
    return await this.colaboradorIndicadorService.getPercentualDeMetasBatidasLast6Mounths(id, date);
  }

}
