import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
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
  use(req: Request, res: Response, next: () => void) {
    const token: string = req.cookies.session;
    if (token.length > 0) {
      this.firebaseApp
        .verifySessionCookie(token)
        .then(async (decodedToken) => {
          const user = {
            uid: decodedToken.uid,
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
      //TODO: check cookie disble and delete cookie and logout.
      this.accessDenied(req.url, res);
    }
  }
}
