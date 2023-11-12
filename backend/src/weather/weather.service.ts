import { Injectable } from '@nestjs/common';
import { WeatherQueryParam } from './dto/weather-query-param.dto';
import { ExternalApiService } from './external-api/external-api.service';
import { DbWeatherService } from './db-weather/db-weather.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly db: DbWeatherService,
    private readonly api: ExternalApiService,
  ) {}

  async getWeather(query: WeatherQueryParam) {
    const data = await this.db.getForecastWeather(query);
    if (data.length > 0) {
      return data;
    }
    const apiData = await this.api.getWeather(query);
    this.db.saveForecastWeather(apiData);
    return apiData;
  }
}
