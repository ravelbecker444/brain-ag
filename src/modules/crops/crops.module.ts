import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsController } from './controllers/crops.controller';
import { Crop } from '../../core/entities/crop.entity';
import { Farm } from '../../core/entities/farm.entity';
import { CropsService } from './services/crops.service';
import { FarmsService } from '../farm/services/farm.service';
import { FarmsModule } from '../farm/farm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Farm]), FarmsModule],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [CropsService],
})
export class CropsModule {}
