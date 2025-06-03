import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  Validate,
} from '@nestjs/class-validator';
import { AreasValidation } from '../../../common/validators/areas.validator';

/**
 * @class CreateFarmDto
 * @classdesc Data Transfer Object for creating a new farm.
 * @property {string} farmName - The name of the farm.
 * @property {string} city - The city where the farm is located.
 * @property {string} state - The state where the farm is located.
 * @property {number} totalAreaHectares - The total area of the farm in hectares.
 * @property {number} arableAreaHectares - The arable area of the farm in hectares. Must be validated by AreasValidation.
 * @property {number} vegetationAreaHectares - The vegetation area of the farm in hectares. Must be validated by AreasValidation.
 * @property {number} producerId - The ID of the producer associated with the farm.
 */
export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsDecimal()
  totalAreaHectares: number;

  @IsDecimal()
  @Validate(AreasValidation)
  arableAreaHectares: number;

  @IsDecimal()
  @Validate(AreasValidation)
  vegetationAreaHectares: number;

  @IsString()
  @IsNotEmpty()
  producerId: number;
}
