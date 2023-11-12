import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WeatherForecast } from './weatherforecast.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => WeatherForecast, (weatherForecast) => weatherForecast.city)
  weatherForecasts: WeatherForecast[];
}
