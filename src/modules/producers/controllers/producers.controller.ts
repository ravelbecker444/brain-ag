import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Producer } from 'src/core/entities/producer.entity';
import { UpdateProducerDto } from '../dto/update-producers.dto';
import { ProducersService } from '../services/producers.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { CreateProducerDto } from '../dto/create-producers.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produtor' })
  @ApiResponse({ status: 201, description: 'Produtor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar produtor' })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtores' })
  @ApiResponse({ status: 200, description: 'Lista de produtores retornada' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.producersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produtor pelo ID' })
  @ApiResponse({ status: 200, description: 'Produtor encontrado' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.producersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produtor pelo ID' })
  @ApiResponse({ status: 200, description: 'Produtor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produtor pelo ID' })
  @ApiResponse({ status: 200, description: 'Produtor removido com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.producersService.remove(id);
  }
  // create(@Body() createProducerDto: CreateProducerDto) {
  //   return this.producersService.create(createProducerDto);
  // }
  // @Get()
  // findAll(@Query('page') page: number, @Query('limit') limit: number) {
  //   return this.producersService.findAll(page, limit);
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.producersService.findOne(id);
  // }

  // @Get('profile/me')
  // getProfile(@CurrentUser() producer: Producer) {
  //   return producer;
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateProducerDto: UpdateProducerDto,
  // ) {
  //   return this.producersService.update(id, updateProducerDto);
  // }

  // @Delete(':id')
  // remove(
  //   @Param('id', ParseIntPipe) id: number,
  //   @CurrentUser() currentProducer: Producer,
  // ) {
  //   if (id !== currentProducer.id) {
  //     throw new ForbiddenException('Você só pode remover seu próprio perfil');
  //   }
  //   return this.producersService.remove(id);
  // }
}
