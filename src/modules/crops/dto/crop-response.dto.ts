import { ApiProperty } from '@nestjs/swagger';
import { Farm } from '../../../core/entities/farm.entity';

/**
 * @class CropResponseDto
 * @classdesc Data transfer object for crop responses.
 * @property {number} id - The unique identifier of the crop.
 * @property {string} name - The name of the crop.
 * @property {string} harvest - The harvest period of the crop.
 * @property {number} plantedAreaHectares - The planted area in hectares.
 * @property {Farm} farm - The farm associated with the crop.
 */
export class CropResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  harvest: string;

  @ApiProperty()
  plantedAreaHectares: number;

  @ApiProperty({ type: () => Farm })
  farm: Farm;
}
