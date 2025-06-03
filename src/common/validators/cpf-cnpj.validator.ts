import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'IsCPFOrCNPJ', async: false })
export class IsCPFOrCNPJ implements ValidatorConstraintInterface {
  validate(documentNumber: string, args: ValidationArguments) {
    if (!documentNumber) return false;

    const cleaned = documentNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cpf.isValid(cleaned);
    } else if (cleaned.length === 14) {
      return cnpj.isValid(cleaned);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Documento inválido (deve ser CPF ou CNPJ válido)';
  }
}
