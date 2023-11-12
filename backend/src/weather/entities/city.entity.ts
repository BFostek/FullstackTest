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
  latitude: string;

  @Column()
  longitude: string

  @OneToMany(() => WeatherForecast, (weatherForecast) => weatherForecast.city)
  weatherForecasts: WeatherForecast[];
  constructor(item: any) {
    if (!item) return;
    this.name = item.name;
    this.country = item.country;
    this.latitude = item.coord.lat.toString();
    this.longitude = item.coord.lon.toString();
  }
}
