import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../../../core/entities/farm.entity';
import { Producer } from '../../../core/entities/producer.entity';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { AreasValidationService } from 'src/common/validators/areas-validator.service';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    private readonly areasValidation: AreasValidationService,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    await this.areasValidation.validateAreas(
      createFarmDto.totalAreaHectares,
      createFarmDto.arableAreaHectares,
      createFarmDto.vegetationAreaHectares,
    );

    const producer = await this.producerRepository.findOne({
      where: { id: createFarmDto.producerId },
    });

    if (!producer) {
      throw new NotFoundException(
        `Produtor com ID ${createFarmDto.producerId} não encontrado`,
      );
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      producer,
    });

    return this.farmRepository.save(farm);
  }

  async findAll(page: number, limit: number): Promise<Farm[]> {
    return this.farmRepository.find({
      relations: ['producer', 'crops'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['producer', 'crops'],
    });

    if (!farm) {
      throw new NotFoundException(`Fazenda com ID ${id} não encontrada`);
    }

    return farm;
  }

  async update(id: number, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    const farm = await this.findOne(id);

    if (
      updateFarmDto.totalAreaHectares ||
      updateFarmDto.arableAreaHectares ||
      updateFarmDto.vegetationAreaHectares
    ) {
      await this.areasValidation.validateAreas(
        updateFarmDto.totalAreaHectares ?? farm.totalAreaHectares,
        updateFarmDto.arableAreaHectares ?? farm.arableAreaHectares,
        updateFarmDto.vegetationAreaHectares ?? farm.vegetationAreaHectares,
      );
    }

    if (
      updateFarmDto.producerId &&
      updateFarmDto.producerId !== farm.producer.id
    ) {
      const producer = await this.producerRepository.findOne({
        where: { id: updateFarmDto.producerId },
      });
      if (!producer) {
        throw new NotFoundException(
          `Produtor com ID ${updateFarmDto.producerId} não encontrado`,
        );
      }
      farm.producer = producer;
    }

    this.farmRepository.merge(farm, updateFarmDto);
    return this.farmRepository.save(farm);
  }

  async remove(id: number): Promise<void> {
    const result = await this.farmRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fazenda com ID ${id} não encontrada`);
    }
  }

  async findByProducer(producerId: number): Promise<Farm[]> {
    return this.farmRepository.find({
      where: { producer: { id: producerId } },
      relations: ['crops'],
    });
  }
}
