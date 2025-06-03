import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Buscar resumo do dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Resumo do dashboard retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao buscar resumo do dashboard',
  })
  async getSummary() {
    const [farmsCount, totalArea] = await Promise.all([
      this.dashboardService.getFarmsCount(),
      this.dashboardService.getTotalArea(),
    ]);

    return { farmsCount, totalArea };
  }

  @Get('by-state')
  @Get('summary')
  @ApiOperation({ summary: 'Buscar resumo do dashboard por estado' })
  @ApiResponse({
    status: 200,
    description: 'Resumo do dashboard por estado retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao buscar resumo do dashboard por estado',
  })
  async getByState() {
    return this.dashboardService.getFarmsByState();
  }

  @Get('by-crop')
  @Get('summary')
  @ApiOperation({ summary: 'Buscar resumo do dashboard por safra' })
  @ApiResponse({
    status: 200,
    description: 'Resumo do dashboard por safra retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao buscar resumo do dashboard por safra',
  })
  async getByCrop() {
    return this.dashboardService.getCropsDistribution();
  }

  @Get('land-usage')
  @Get('summary')
  @ApiOperation({ summary: 'Buscar resumo do dashboard por uso de solo' })
  @ApiResponse({
    status: 200,
    description: 'Resumo do dashboard por uso de solo retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao buscar resumo do dashboard por uso de solo',
  })
  async getLandUsage() {
    return this.dashboardService.getLandUsage();
  }

  @Get('full-report')
  @Get('summary')
  @ApiOperation({ summary: 'Buscar resumo completo do dashboard ' })
  @ApiResponse({
    status: 200,
    description: 'Resumo do completo dashboard cretornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao buscar resumo completo do dashboard',
  })
  async getFullReport() {
    const [summary, byState, byCrop, landUsage] = await Promise.all([
      this.getSummary(),
      this.getByState(),
      this.getByCrop(),
      this.getLandUsage(),
    ]);

    return {
      summary,
      charts: {
        byState,
        byCrop,
        landUsage,
      },
    };
  }
}
