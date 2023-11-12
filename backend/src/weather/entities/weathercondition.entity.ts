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
  constructor(item: any) {
    if (!item) return;
    this.conditionId = item.id;
    this.main = item.main;
    this.description = item.description;
    this.icon = item.icon;
  }
}
