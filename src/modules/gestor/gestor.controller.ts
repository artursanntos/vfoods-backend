import { Body, Controller, Delete, Get, Param, Post, HttpCode, HttpStatus } from '@nestjs/common';
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
    @Get(':email')
    async findOne(@Param('email') email: string) {
      return this.gestorService.findOne(email);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login/')
    async login(@Body('email') email: string, @Body('senha') senha: string) {
      return this.gestorService.login(email, senha);
    }

    //excluir gestor
    @Delete(':email')
    async remove(@Param('email') email: string) {
      return this.gestorService.remove(email);
    }

    //pegar colaboradores do gestor
    @Get('/colaboradores/:email')
    async findAllColFromOne(@Param('email') email: string) {
      return this.gestorService.findAllColFromOne(email);
    }

}
