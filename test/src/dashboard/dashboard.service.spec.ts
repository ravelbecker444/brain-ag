import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crop } from 'src/core/entities/crop.entity';
import { Farm } from 'src/core/entities/farm.entity';
import { DashboardService } from 'src/modules/dashboard/services/dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const mockFarmRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({
        totalFarms: '10',
        totalArea: '1000',
      }),
      getRawMany: jest
        .fn()
        .mockResolvedValueOnce([{ state: 'SP', count: 5 }])
        .mockResolvedValueOnce([{ arableArea: 600, vegetationArea: 400 }]),
    })),
  };
  const mockCropRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ crop: 'Soja', count: 3 }]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(Farm),
          useValue: mockFarmRepository,
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should return dashboard data', async () => {
    const result = await service.getDashboardData();
    expect(result.totalFarms).toBe(10);
    expect(result.totalArea).toBe(1000);
    expect(result.farmsByState).toEqual([{ state: 'SP', count: 5 }]);
    expect(result.cropsData).toEqual([{ crop: 'Soja', count: 3 }]);
    expect(result.landUsage).toEqual({ arableArea: 600, vegetationArea: 400 });
  });
});
