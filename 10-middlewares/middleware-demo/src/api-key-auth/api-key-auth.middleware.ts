import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApiKeyAuthService } from './api-key-auth.service';

@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyAuthService: ApiKeyAuthService) {}

  use(req: any, res: any, next: () => void) {
    const apiKey = req.headers['api-key'];
    if (!apiKey || !this.apiKeyAuthService.isApiKeyValid(apiKey)) {
      return false;
    }
    next();
  }
}
