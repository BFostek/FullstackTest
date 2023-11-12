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
  private roundCoord = (coord: string) => Number(coord).toFixed(4).toString();
  private fixQuery = (query: WeatherQueryParam) : WeatherQueryParam => ({...query, lat: this.roundCoord(query.lat), lon: this.roundCoord(query.lon)})
  async getWeather(query: WeatherQueryParam) {
    // To ajust the coordinates to the 4 decimal places, to be equal the api precision
    query = this.fixQuery(query);
    const data = await this.db.getForecastWeather(query);
    if (data.length > 0) {
      return data;
    } 
    const apiData = await this.api.getWeather(query);
    await this.db.saveForecastWeather(apiData);
    return apiData;
  }
}
