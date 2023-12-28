import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 45, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 45, unique: true, name: 'user_name' })
  username: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 45 })
  password: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  dni: string;

  @OneToOne(() => Role, {
    eager: true
  })
  @JoinColumn({ name: 'id_role' })
  role: Role;
}
