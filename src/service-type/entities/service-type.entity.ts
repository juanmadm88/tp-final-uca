import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_types')
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  description: string;

  @Column({ type: Boolean, name: 'is_active', default: true })
  isActive: boolean;
}
