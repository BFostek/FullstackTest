import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { City } from './city.entity';
import { WeatherCondition } from './weathercondition.entity';

@Entity()
export class WeatherForecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  timestamp: Date;

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

  @ManyToOne(() => City, (city) => city.weatherForecasts, { cascade: true })
  @JoinColumn()
  city: City;
  @ManyToOne(() => WeatherCondition, { cascade: true })
  @JoinColumn()
  weatherCondition: WeatherCondition;
}
