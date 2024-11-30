import { ApiKeyAuthMiddleware } from './api-key-auth.middleware';

describe('ApiKeyAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiKeyAuthMiddleware()).toBeDefined();
  });
});
