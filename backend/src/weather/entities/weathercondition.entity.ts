import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WeatherForecast } from './weatherforecast.entity';

@Entity()
export class WeatherCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conditionId: number;

  @Column()
  main: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @OneToMany(
    () => WeatherForecast,
    (weatherForecast) => weatherForecast.weatherCondition,
  )
  weatherForecasts: WeatherForecast[];
}
