import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { CreateFarmDto } from '../../modules/farm/dto/create-farm.dto';

@ValidatorConstraint({ name: 'AreasValidation', async: false })
export class AreasValidation implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const object = args.object as CreateFarmDto;
    const sum =
      Number(object.arableAreaHectares) + Number(object.vegetationAreaHectares);
    return sum <= Number(object.totalAreaHectares);
  }

  defaultMessage(args: ValidationArguments) {
    return 'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda';
  }
}
