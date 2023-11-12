export class WeatherList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
  constructor(data: any){
    if(!data){
      return;
    }
    this.dt = data.dt;
    this.main = data.main;
    this.weather = data.weather;
    this.clouds = data.clouds;
    this.wind = data.wind;
    this.sys = data.sys;
  }
}
