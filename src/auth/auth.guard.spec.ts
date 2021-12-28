import { AuthGuard } from './auth.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
