import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    generated: 'uuid',
    unique: true,
  })
  uuid: string;

  @Column()
  target: string;
}
