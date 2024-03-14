import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderUserId: number;

  @Column()
  receiverUserId: number;

  @Column()
  amount: number;

  @Column()
  description: string;
}