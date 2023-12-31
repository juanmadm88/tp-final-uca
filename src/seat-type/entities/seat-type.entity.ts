import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seat_types')
export class SeatType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  description: string;

  @Column({ type: Boolean, name: 'is_active' })
  isActive: boolean;
}
