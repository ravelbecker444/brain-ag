import { Entity, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Farm } from './farm.entity';
import { AgBaseEntity } from './base.entity';

@Entity({ name: 'crops' })
export class Crop extends AgBaseEntity {
  @Column()
  name: string;

  @Column()
  harvest: string;

  @Column({
    name: 'planted_area_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  plantedAreaHectares: number;

  @ManyToOne(() => Farm, (farm) => farm.crops, {
    onDelete: 'CASCADE',
  })
  farm: Farm;
}
