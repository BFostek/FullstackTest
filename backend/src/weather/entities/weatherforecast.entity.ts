import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class WeatherForecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: number;

  @Column()
  temperature: number;

  @Column()
  feelsLike: number;

  @Column()
  minTemperature: number;

  @Column()
  maxTemperature: number;

  @Column()
  pressure: number;

  @Column()
  humidity: number;

  @Column()
  weatherDescription: string;

  @Column()
  weatherIcon: string;

  @ManyToOne(() => City, (city) => city.weatherForecasts, { cascade: true })
  @JoinColumn()
  city: City;
}
