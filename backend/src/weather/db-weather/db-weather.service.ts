import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherForecast } from '../entities/weatherforecast.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { WeatherCondition } from '../entities/weathercondition.entity';
import { City } from '../entities/city.entity';
import { WeatherQueryParam } from '../dto/weather-query-param.dto';
import { WeatherDTO } from '../dto/weather.dto';

@Injectable()
export class DbWeatherService {
  constructor(
    @InjectRepository(WeatherForecast)
    private readonly forecastRepository: Repository<WeatherForecast>,

    @InjectRepository(WeatherCondition)
    private readonly conditionRepository: Repository<WeatherCondition>,

    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  getForecastWeather(params: WeatherQueryParam): Promise<WeatherForecast[]> {
    return this.forecastRepository.find({
      relations: ['city', 'weatherCondition'],
      where: {
        city: { latitude: params.lat, longitude: params.lon },
        createdAt: MoreThanOrEqual(new Date(Date.now() - 5 * 60 * 60 * 1000)),
      },
      order: { timestamp: 'DESC' },
    });
  }
  async saveForecastWeather(data: WeatherDTO): Promise<WeatherForecast[]> {
    // check if city exists
    let city = await this.cityRepository.findOne({
      where: [
        {
          latitude: data.city.coord.lat.toString(),
          longitude: data.city.coord.lon.toString(),
        },
        { name: data.city.name },
      ],
    });
    if (!city) {
      city = await this.cityRepository.save(new City(data.city));
    }
    // check if forecast exists
    const forecast = await this.forecastRepository.find({
      where: {
        city: { name: city.name },
        createdAt: MoreThanOrEqual(new Date(Date.now() - 5 * 60 * 60 * 1000)),
      },
    });
    if (forecast.length > 0) {
      this.cityRepository.update(city.id, {
        latitude: data.city.coord.lat.toString(),
        longitude: data.city.coord.lon.toString(),
      });
      return forecast;
    }
    const result: WeatherForecast[] = [];
    for (const item of data.list) {
      let condition = await this.conditionRepository.findOne({
        where: { conditionId: item.weather[0].id },
      });
      if (!condition) {
        condition = await this.conditionRepository.save(
          new WeatherCondition(item.weather[0]),
        );
      }
      let newforecast = new WeatherForecast(item, city, condition)
      result.push(newforecast);
      this.forecastRepository.save(newforecast);
    }
    // save weather forecast
    return result;
  }
}
