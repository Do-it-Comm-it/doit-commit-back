import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { FirebaseAppService } from './auth.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private firebaseApp: FirebaseAppService) {}

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }

  //PROCESS: verify the firebase bearer token by use() method.
  use(req: any, res: any, next: () => void) {
    const token: string | null = req.headers.authorization;
    if (token != null && token.length > 0) {
      this.firebaseApp
        .verify(token)
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.log(error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.accessDenied(req.url, res);
    }
  }
}
