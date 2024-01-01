import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './seat.entity';
import { Model } from '../../model/entities/model.entity';
import { Brand } from '../../brand/entities/brand.entity';

@Entity('autobuses')
export class Autobus {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Seat, (seat) => seat.autobus, {
    cascade: ['insert', 'remove']
  })
  seats: Seat[];

  @Column({ type: Boolean, default: false })
  asigned: boolean;

  @OneToOne(() => Model, {
    eager: true
  })
  @JoinColumn({ name: 'id_model' })
  model: Model;

  @OneToOne(() => Brand, {
    eager: true
  })
  @JoinColumn({ name: 'id_brand' })
  brand: Brand;
}
