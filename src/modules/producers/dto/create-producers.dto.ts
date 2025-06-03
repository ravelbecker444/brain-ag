/**
 * @class CreateProducerDto
 * @classdesc Data transfer object for creating a new producer.
 */
import { IsNotEmpty, IsString, Validate } from '@nestjs/class-validator';
import { IsCPFOrCNPJ } from 'src/common/validators/cpf-cnpj.validator';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsCPFOrCNPJ)
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  producerName: string;
}
