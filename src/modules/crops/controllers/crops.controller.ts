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
import { CropsService } from '../services/crops.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Producer } from 'src/core/entities/producer.entity';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { FarmsService } from 'src/modules/farm/services/farm.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('crops')
export class CropsController {
  constructor(
    private readonly cropsService: CropsService,
    private readonly farmsService: FarmsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as culturas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Culturas retornadas com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma cultura encontrada' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.cropsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cropsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cultura' })
  @ApiResponse({ status: 201, description: 'Cultura criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma cultura' })
  @ApiResponse({
    status: 200,
    description: 'Cultura atualizada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Cultura não encontrada.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCropDto: UpdateCropDto,
  ) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma cultura' })
  @ApiResponse({ status: 200, description: 'Cultura removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cultura não encontrada.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.cropsService.remove(id);
  }
}

// @Post()
// async create(@Body() createCropDto: CreateCropDto) {
//   return this.cropsService.create(createCropDto);
// }

// @Put(':id')
// async update(
//   @Param('id', ParseIntPipe) id: number,
//   @Body() updateCropDto: UpdateCropDto,
// ) {
//   return this.cropsService.update(id, updateCropDto);
// }

// @Delete(':id')
// async remove(@Param('id', ParseIntPipe) id: number) {
//   return this.cropsService.remove(id);
// }
// }
