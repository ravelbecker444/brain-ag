/**
 * @class UpdateProducerDto
 * @classdesc Represents the data transfer object for updating a producer.
 * It extends the CreateProducerDto with optional fields, allowing partial updates.
 * @extends {PartialType<CreateProducerDto>}
 */
import { IsOptional, IsString } from '@nestjs/class-validator';
import { CreateProducerDto } from './create-producers.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {
  @IsString()
  @IsOptional()
  producerName?: string;
}
