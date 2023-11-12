import { Injectable } from '@nestjs/common';
import { WeatherQueryParam } from '../dto/weather-query-param.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalApiService {
  readonly externalApiKey = this.configService.get<string>(
    'OPEN_WEATHER_API_KEY',
  );
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private createUrl(cityData: WeatherQueryParam): string {
    const { lat, lon } = cityData;

    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.externalApiKey}`;
  }
  async getWeather(cityData: WeatherQueryParam): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.createUrl(cityData),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
