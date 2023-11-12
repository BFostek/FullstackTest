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

  @Column('decimal')
  temperature: number;

  @Column('decimal')
  feelsLike: number;

  @Column('decimal')
  minTemperature: number;

  @Column('decimal')
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
