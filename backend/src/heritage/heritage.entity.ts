import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, RelationId, JoinColumn } from 'typeorm';
import { Place } from '../place/place.entity';
import { Image } from 'src/image/image.entity';

@Entity()
export class Heritage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({nullable: true}) 
  thumbnailUrl: string;

  @Column({ length: 1000}) 
  mapUrl: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('json', { nullable: true })
  tags: string;

  @ManyToOne(() => Place, place => place.heritages)
  @JoinColumn()
  place: Place;
}
