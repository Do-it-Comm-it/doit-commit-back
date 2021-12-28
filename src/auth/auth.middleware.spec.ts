import { AuthMiddleware } from './auth.middleware';
import { FirebaseAppService } from './auth.service';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    const firebaseApp = new FirebaseAppService();
    expect(new AuthMiddleware(firebaseApp)).toBeDefined();
  });
});
