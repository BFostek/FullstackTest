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
  ) { }
  getForecastWeather(params: WeatherQueryParam): Promise<WeatherForecast[]> {
    return this.forecastRepository.find({
      where: {
        city: { latitude: params.lat, longitude: params.lon},
        // more then 5 ours ago
        createdAt: MoreThanOrEqual(new Date(Date.now() - 5 * 60 * 60 * 1000)),
      },
      order: { timestamp: 'DESC' },
    });
  }
  async saveForecastWeather(data: WeatherDTO): Promise<boolean> {
    // check if city exists
    // TODO: REFACTOR CONSTRUCTORS
    let city = await this.cityRepository.findOne({ where: { latitude: data.city.coord.lat.toString(), longitude: data.city.coord.lon.toString()} });
    if (!city) {
      const newCity = new City();
      newCity.name = data.city.name;
      newCity.country = data.city.country;
      newCity.latitude = (data.city.coord.lat.toString());
      newCity.longitude = (data.city.coord.lon.toString());
      console.log(newCity)
      city = await this.cityRepository.save(newCity);
    }
    for (const item of data.list) {
      // check if weather condition exists
      let condition = await this.conditionRepository.findOne({ where: { conditionId: item.weather[0].id }, });
      if (!condition) {
        const newCondition = new WeatherCondition();
        newCondition.conditionId = item.weather[0].id;
        newCondition.main = item.weather[0].main;
        newCondition.description = item.weather[0].description;
        newCondition.icon = item.weather[0].icon;
        try{
        condition = await this.conditionRepository.save(newCondition);}
        catch(err){
          console.log(err)
        }
      }

      const forecast = new WeatherForecast();
      forecast.city = city;
      forecast.temperature = item.main.temp;
      forecast.pressure = item.main.pressure;
      forecast.humidity = item.main.humidity;
      forecast.timestamp = new Date(item.dt * 1000);
      forecast.feelsLike = item.main.feels_like;
      forecast.maxTemperature = item.main.temp_max;
      forecast.minTemperature = item.main.temp_min;
      forecast.weatherCondition = condition;
try{
      this.forecastRepository.save(forecast);}
      catch(err){
        console.log(err)
      }
    }
    // save weather forecast
    return Promise.resolve(true);
  }
}
