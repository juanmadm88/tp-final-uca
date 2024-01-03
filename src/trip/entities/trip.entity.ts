import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Terminal } from '../../terminal/entities/terminal.entity';
import { Autobus } from '../../autobus/entities/autobus.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', name: 'departure_date' })
  departureDate: Date;

  @Column({ type: 'datetime', name: 'arrival_date' })
  arrivalDate: Date;

  @Column({ type: Boolean, default: true })
  finished: boolean;

  @OneToOne(() => Autobus, {
    eager: true
  })
  @JoinColumn({ name: 'id_autobus' })
  autobus: Autobus;

  @OneToOne(() => Terminal, {
    eager: true
  })
  @JoinColumn({ name: 'id_origin' })
  origin: Terminal;

  @OneToOne(() => Terminal, {
    eager: true
  })
  @JoinColumn({ name: 'id_destination' })
  destination: Terminal;
}
