import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Heritage } from 'src/heritage/heritage.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ length: 1000 })
  mapUrl: string;

  @OneToMany(() => Heritage, (heritags) => heritags.place, { cascade: true })
  heritages: Heritage[];
}
