import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherForecast } from '../entities/weatherforecast.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { WeatherCondition } from '../entities/weathercondition.entity';
import { City } from '../entities/city.entity';
import { WeatherQueryParam } from '../dto/weather-query-param.dto';

@Injectable()
export class DbWeatherService {
  constructor(
    @InjectRepository(WeatherForecast)
    private readonly forecastRepository: Repository<WeatherForecast>,

    @InjectRepository(WeatherCondition)
    private readonly conditionRepository: Repository<WeatherCondition>,

    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) { }
  getForecastWeather(params: WeatherQueryParam): Promise<WeatherForecast[]> {
    return this.forecastRepository.find({
      where: {
        city: { name: params.city },
        // more then 5 ours ago
        createdAt: MoreThanOrEqual(new Date(Date.now() - 5 * 60 * 60 * 1000)),
      },
      order: { createdAt: 'DESC' },
    });
  }
  async saveForecastWeather(data: WeatherForecast): Promise<boolean> {
    // check if city exists
    const city =await  this.cityRepository.findOne({ where: { name: data.city.name } });
    if (!city) {
      this.cityRepository.save(data.city);
    }
    // check if weather condition exists
    const condition =await  this.conditionRepository.findOne({ where: { conditionId: data.weatherCondition.conditionId },});
    if (!condition) {
      this.conditionRepository.save(data.weatherCondition);
    }
    // save weather forecast
    return !!(await this.forecastRepository.save(data));
  }
}
