import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '../../core/entities/producer.entity';
import { Farm } from '../../core/entities/farm.entity';
import { ProducersController } from './controllers/producers.controller';
import { ProducersService } from './services/producers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm])],
  controllers: [ProducersController],
  providers: [ProducersService],
  exports: [ProducersService],
})
export class ProducersModule {}
