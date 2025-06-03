/**
 * @class UpdateFarmDto
 * @classdesc Represents the data transfer object for updating a farm.
 * It extends the CreateFarmDto with optional fields, allowing partial updates.
 * @extends PartialType(CreateFarmDto)
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from './create-farm.dto';
import { IsNumber, IsOptional } from '@nestjs/class-validator';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {
  @IsNumber()
  @IsOptional()
  producerId?: number;
}
