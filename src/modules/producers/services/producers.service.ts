import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../../../core/entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producers.dto';
import { UpdateProducerDto } from '../dto/update-producers.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const existingProducer = await this.producerRepository.findOne({
      where: { documentNumber: createProducerDto.documentNumber },
    });

    if (existingProducer) {
      throw new ConflictException('Já existe um produtor com este CPF/CNPJ');
    }

    const producer = this.producerRepository.create(createProducerDto);
    return this.producerRepository.save(producer);
  }

  async findAll(page: number, limit: number): Promise<Producer[]> {
    return await this.producerRepository.find({
      relations: ['farms', 'farms.crops'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['farms', 'farms.crops'],
    });

    if (!producer) {
      throw new NotFoundException(`Produtor com ID ${id} não encontrado`);
    }

    return producer;
  }

  async update(
    id: number,
    updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    const producer = await this.findOne(id);
    this.producerRepository.merge(producer, updateProducerDto);
    return this.producerRepository.save(producer);
  }

  async remove(id: number): Promise<void> {
    const result = await this.producerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produtor com ID ${id} não encontrado`);
    }
  }
}
