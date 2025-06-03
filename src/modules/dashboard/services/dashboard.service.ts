import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../../../core/entities/farm.entity';
import { Crop } from '../../../core/entities/crop.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async getFarmsCount(): Promise<number> {
    return this.farmRepository.count();
  }

  async getTotalArea(): Promise<number> {
    const result = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalAreaHectares)', 'total')
      .getRawOne();
    return parseFloat(result.total) || 0;
  }

  async getFarmsByState(): Promise<{ state: string; count: number }[]> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('farm.state')
      .getRawMany();
  }

  async getCropsDistribution(): Promise<{ name: string; count: number }[]> {
    return this.cropRepository
      .createQueryBuilder('crop')
      .select('crop.name', 'name')
      .addSelect('COUNT(*)', 'count')
      .groupBy('crop.name')
      .getRawMany();
  }

  async getLandUsage(): Promise<{
    arableArea: number;
    vegetationArea: number;
  }> {
    const result = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.arableAreaHectares)', 'arableArea')
      .addSelect('SUM(farm.vegetationAreaHectares)', 'vegetationArea')
      .getRawOne();

    return {
      arableArea: parseFloat(result.arableArea) || 0,
      vegetationArea: parseFloat(result.vegetationArea) || 0,
    };
  }
}
