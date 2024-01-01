import { SeatType } from '../../seat-type/entities/seat-type.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Autobus } from './autobus.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => SeatType, {
    eager: true
  })
  @JoinColumn({ name: 'id_seat_type' })
  seatType: SeatType;

  @Column({ type: Boolean, default: false })
  booked: boolean;

  @ManyToOne(() => Autobus)
  @JoinColumn({ name: 'id_autobus', referencedColumnName: 'id' })
  autobus: Autobus;
}
