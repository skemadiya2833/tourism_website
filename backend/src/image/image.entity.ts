import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { EntityType } from '../types/entityType.enum';
import { Place } from 'src/place/place.entity';
import { Heritage } from 'src/heritage/heritage.entity';
import { Hotel } from 'src/hotel/hotel.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  publicID: string;

  @Column({ type: 'enum', enum: EntityType })
  entityType: EntityType;

  @Column()
  imageLink: string;

  @Column({ default: false })
  isDeleted: boolean;

  // @ManyToOne(() => Place , (place) => place.images) 
  // @JoinColumn()
  // place : Place;

  // @ManyToOne(() => Heritage , (heritage) => heritage.images) 
  // @JoinColumn()
  // heritage : Heritage;

  // @ManyToOne(() => Hotel , (hotel) => hotel.images) 
  // @JoinColumn()
  // hotel: Hotel;

  @Column() 
  entityId: string

}


