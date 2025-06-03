import { ApiProperty } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiProperty({ description: 'Total de fazendas cadastradas' })
  totalFarms: number;

  @ApiProperty({ description: 'Área total em hectares' })
  totalArea: number;

  @ApiProperty({
    description: 'Distribuição de fazendas por estado',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        state: { type: 'string' },
        count: { type: 'number' },
      },
    },
  })
  farmsByState: Array<{ state: string; count: number }>;

  @ApiProperty({
    description: 'Distribuição de culturas plantadas',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        crop: { type: 'string' },
        count: { type: 'number' },
      },
    },
  })
  cropsData: Array<{ crop: string; count: number }>;

  @ApiProperty({
    description: 'Uso do solo (área agricultável vs vegetação)',
    type: 'object',
    properties: {
      arableArea: { type: 'number' },
      vegetationArea: { type: 'number' },
    },
  })
  landUsage: {
    arableArea: number;
    vegetationArea: number;
  };
}
