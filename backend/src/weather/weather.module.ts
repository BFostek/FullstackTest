import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { ExternalApiService } from './external-api/external-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WeatherForecast } from './entities/weatherforecast.entity';
import { WeatherCondition } from './entities/weathercondition.entity';
import { DbWeatherService } from './db-weather/db-weather.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, WeatherCondition, WeatherForecast]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    ExternalApiService,
    DbWeatherService,
  ],
})
export class WeatherModule {}
