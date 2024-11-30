import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyAuthService {
    isApiKeyValid(apiKey: string): boolean {
        return apiKey === 'api-key-123';
    }
}
