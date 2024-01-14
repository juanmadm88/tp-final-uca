import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Trip } from '../../trip/entities/trip.entity';
import { ServiceType } from '../../service-type/entities/service-type.entity';
import { Seat } from '../../autobus/entities/seat.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: Boolean, default: false })
  cancelled: boolean;

  @ManyToOne(() => Seat, { cascade: ['update'] })
  @JoinColumn({ name: 'id_seat', referencedColumnName: 'id' })
  seat: Seat;

  @OneToOne(() => User, {
    eager: true
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToOne(() => Trip, {
    eager: true
  })
  @JoinColumn({ name: 'id_trip' })
  trip: Trip;

  @OneToOne(() => ServiceType, {
    eager: true
  })
  @JoinColumn({ name: 'id_service_type' })
  serviceType: ServiceType;
}
