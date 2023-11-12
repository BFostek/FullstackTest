import { Injectable } from '@nestjs/common';
import { WeatherQueryParam } from './dto/weather-query-param.dto';
import { ExternalApiService } from './external-api/external-api.service';

@Injectable()
export class WeatherService {
  constructor(private readonly api: ExternalApiService) {

  }
  async getWeather(query: WeatherQueryParam): Promise<any>{
    return await this.api.getWeather(query);
  }
}
