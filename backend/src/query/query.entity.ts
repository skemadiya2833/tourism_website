import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum QueryStatus {
  SEEN = 'SEEN',
  UNSEEN = 'UNSEEN',
  RESPONDED = 'RESPONDED',
}

@Entity()
export class Query {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('text')
  message: string;

  @Column({ type: 'enum', enum: QueryStatus, default: QueryStatus.UNSEEN })
  status: QueryStatus;

  @Column({ default: false })
  isDeleted: boolean;
}