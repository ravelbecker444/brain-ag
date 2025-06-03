import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

/**
 * @class CreateCropDto
 * @classdesc Data Transfer Object for creating a new crop.
 * @property {string} name - The name of the crop.
 * @property {string} harvest - The harvest of the crop.
 * @property {number} plantedAreaHectares - The planted area in hectares.
 * @property {number} farmId - The ID of the farm where the crop is planted.
 */
export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  harvest: string;

  @IsNumber()
  plantedAreaHectares: number;

  @IsNumber()
  farmId: number;
}
