import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  email?: string;
}
