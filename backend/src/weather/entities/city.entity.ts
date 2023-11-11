import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lat: number;
  @Column()
  lon: number;

}
