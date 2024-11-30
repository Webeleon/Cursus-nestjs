import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyAuthService } from './api-key-auth.service';

describe('ApiKeyAuthService', () => {
  let service: ApiKeyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyAuthService],
    }).compile();

    service = module.get<ApiKeyAuthService>(ApiKeyAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
