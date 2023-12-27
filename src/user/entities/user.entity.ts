import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
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
}
