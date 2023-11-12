import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { ExternalApiService } from './external-api/external-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([City]), HttpModule, ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService, ExternalApiService]
})
export class WeatherModule {}
