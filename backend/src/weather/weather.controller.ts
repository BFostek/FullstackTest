import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherQueryParam } from './dto/weather-query-param.dto';

@Controller('weather')
export class WeatherController{
  constructor(private weatherService: WeatherService) {}
  @Get()
  getWeather(
    @Query() query: WeatherQueryParam,
  ): Promise<any> {
    return this.weatherService.getWeather(query);
  }

}

