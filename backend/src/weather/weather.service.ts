import { Injectable } from '@nestjs/common';
import { WeatherQueryParam } from './dto/weather-query-param.dto';

@Injectable()
export class WeatherService {
  getWeather(query: WeatherQueryParam): string {
    return JSON.stringify(query);
  }
}
