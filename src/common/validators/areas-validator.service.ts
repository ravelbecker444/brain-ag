import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AreasValidationService {
  async validateAreas(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ): Promise<void> {
    const sum = arableArea + vegetationArea;

    if (sum > totalArea) {
      throw new BadRequestException(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda',
      );
    }
  }
}
