import { Entity, Column, OneToMany, BeforeInsert, BaseEntity } from 'typeorm';
import { Farm } from './farm.entity';
import { AgBaseEntity } from './base.entity';

@Entity({ name: 'producers' })
export class Producer extends AgBaseEntity {
  @Column({ name: 'document_number', unique: true })
  documentNumber: string;

  @Column({ name: 'producer_name' })
  producerName: string;

  @OneToMany(() => Farm, (farm) => farm.producer, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  farms: Farm[];
}
