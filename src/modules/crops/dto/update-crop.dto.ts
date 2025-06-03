/**
 * @class UpdateCropDto
 * @classdesc Represents the data transfer object for updating a crop.
 * It extends the CreateCropDto with optional fields, allowing partial updates.
 * @extends PartialType(CreateCropDto)
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCropDto } from './create-crop.dto';
import { IsNumber, IsOptional } from '@nestjs/class-validator';

export class UpdateCropDto extends PartialType(CreateCropDto) {
  @IsNumber()
  @IsOptional()
  farmId?: number;
}
