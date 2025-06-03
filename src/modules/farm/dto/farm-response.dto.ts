import { ApiProperty } from '@nestjs/swagger';
import { Producer } from '../../../core/entities/producer.entity';
import { Crop } from '../../../core/entities/crop.entity';

/**
 * @class FarmResponseDto
 * @classdesc Represents the response data for a farm, including its properties and associated producer and crops.
 * @property {number} id - The unique identifier of the farm.
 * @property {string} farmName - The name of the farm.
 * @property {string} city - The city where the farm is located.
 * @property {string} state - The state where the farm is located.
 * @property {number} totalAreaHectares - The total area of the farm in hectares.
 * @property {number} arableAreaHectares - The arable area of the farm in hectares.
 * @property {number} vegetationAreaHectares - The vegetation area of the farm in hectares.
 * @property {Producer} producer - The producer associated with the farm.
 * @property {Crop[]} crops - The crops cultivated on the farm.
 */
export class FarmResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  farmName: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  totalAreaHectares: number;

  @ApiProperty()
  arableAreaHectares: number;

  @ApiProperty()
  vegetationAreaHectares: number;

  @ApiProperty({ type: () => Producer })
  producer: Producer;

  @ApiProperty({ type: () => [Crop] })
  crops: Crop[];
}
