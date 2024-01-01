import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('terminals')
export class Terminal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  description: string;

  @Column({ type: 'int' })
  kilometer: number;
}
