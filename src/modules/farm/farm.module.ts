import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from '../../core/entities/farm.entity';
import { Producer } from '../../core/entities/producer.entity';
import { FarmsController } from './controllers/farm.controller';
import { AreasValidationService } from 'src/common/validators/areas-validator.service';
import { FarmsService } from './services/farm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Producer])],
  controllers: [FarmsController],
  providers: [FarmsService, AreasValidationService],
  exports: [FarmsService],
})
export class FarmsModule {}
