import { IsNotEmpty, IsString } from 'class-validator';

export class WeatherQueryParam {
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  lat: string;
  @IsNotEmpty()
  @IsString()
  lon: string;
}
