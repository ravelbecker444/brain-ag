import { Entity, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Producer } from './producer.entity';
import { Crop } from './crop.entity';
import { AgBaseEntity } from './base.entity';

@Entity({ name: 'farms' })
export class Farm extends AgBaseEntity {
  @Column({ name: 'farm_name' })
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({
    name: 'total_area_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalAreaHectares: number;

  @Column({
    name: 'arable_area_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  arableAreaHectares: number;

  @Column({
    name: 'vegetation_area_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  vegetationAreaHectares: number;

  @ManyToOne(() => Producer, (producer) => producer.farms)
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.farm, {
    cascade: true,
  })
  crops: Crop[];
}
