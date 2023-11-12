import { Test, TestingModule } from '@nestjs/testing';
import { DbWeatherService } from './db-weather.service';

describe('DbWeatherService', () => {
  let service: DbWeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbWeatherService],
    }).compile();

    service = module.get<DbWeatherService>(DbWeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
