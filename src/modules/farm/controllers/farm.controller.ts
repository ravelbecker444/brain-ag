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
} from '@nestjs/common';
import { FarmsService } from '../services/farm.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Producer } from 'src/core/entities/producer.entity';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as fazendas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Fazendas retornadas com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma fazenda encontrada' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.farmsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma fazenda por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Fazenda retornada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Fazenda não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova fazenda',
  })
  @ApiResponse({
    status: 200,
    description: 'Fazenda criada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Erro ao criar fazenda' })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create({
      ...createFarmDto,
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Editar uma fazenda',
  })
  @ApiResponse({
    status: 200,
    description: 'Fazenda editada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Erro ao editar fazenda' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma fazenda',
  })
  @ApiResponse({
    status: 200,
    description: 'Fazenda excluida com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Erro ao excluir fazenda' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.remove(id);
  }
}
