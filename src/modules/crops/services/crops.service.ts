import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../../../core/entities/crop.entity';
import { Farm } from '../../../core/entities/farm.entity';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { FarmsService } from 'src/modules/farm/services/farm.service';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    private readonly farmsService: FarmsService,
  ) {}

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const farm = await this.farmRepository.findOne({
      where: { id: createCropDto.farmId },
    });

    if (!farm) {
      throw new NotFoundException(
        `Fazenda com ID ${createCropDto.farmId} não encontrada`,
      );
    }

    const crop = this.cropRepository.create({
      ...createCropDto,
      farm,
    });

    return this.cropRepository.save(crop);
  }

  async findAll(page: number, limit: number): Promise<Crop[]> {
    return this.cropRepository.find({
      relations: ['farm', 'farm.producer'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id },
      relations: ['farm', 'farm.producer'],
    });

    if (!crop) {
      throw new NotFoundException(`Cultura com ID ${id} não encontrada`);
    }

    return crop;
  }

  async update(id: number, updateCropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findOne(id);

    if (updateCropDto.farmId && updateCropDto.farmId !== crop.farm.id) {
      const farm = await this.farmRepository.findOne({
        where: { id: updateCropDto.farmId },
      });
      if (!farm) {
        throw new NotFoundException(
          `Fazenda com ID ${updateCropDto.farmId} não encontrada`,
        );
      }
      crop.farm = farm;
    }

    this.cropRepository.merge(crop, updateCropDto);
    return this.cropRepository.save(crop);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cropRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cultura com ID ${id} não encontrada`);
    }
  }

  async findByFarm(farmId: number): Promise<Crop[]> {
    return this.cropRepository.find({
      where: { farm: { id: farmId } },
      relations: ['farm'],
    });
  }

  async findByHarvest(harvest: string): Promise<Crop[]> {
    return this.cropRepository.find({
      where: { harvest },
      relations: ['farm', 'farm.producer'],
    });
  }
}
