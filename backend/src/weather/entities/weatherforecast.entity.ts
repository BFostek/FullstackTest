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
import { WeatherList } from '../dto/weatherList.dto';

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
  constructor(dto: WeatherList, city: City, weatherCondition: WeatherCondition) {
    if (!dto) return;
    this.city = city;
    this.weatherCondition = weatherCondition;
    this.timestamp = new Date(dto.dt * 1000);
    this.temperature = dto.main.temp;
    this.feelsLike = dto.main.feels_like;
    this.minTemperature = dto.main.temp_min;
    this.maxTemperature = dto.main.temp_max;
    this.pressure = dto.main.pressure;
    this.humidity = dto.main.humidity; 
  }
}
