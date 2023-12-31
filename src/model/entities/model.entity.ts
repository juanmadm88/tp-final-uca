import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  description: string;
}
