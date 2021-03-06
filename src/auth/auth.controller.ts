import { Controller, Get, Res, Req, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { FirebaseAppService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private firebaseApp: FirebaseAppService,
    private userService: UsersService,
  ) {}

  @Get()
  async auth(@Res() response: Response, @Req() request: Request) {
    const token: string | null = request.headers.authorization;
    if (token != null && token.length > 0) {
      const decodedToken = await this.firebaseApp.verify(token);

      try {
        let user = await this.userService.getUser(decodedToken.uid);

        if (!user) {
          user = await this.userService.signUp({
            email: decodedToken.email,
            image: decodedToken.picture,
            uid: decodedToken.uid,
          });
        }
        const sessionCookie = await this.firebaseApp.createCookie(token);
        const options = {
          maxAge: 60 * 60 * 24 * 5 * 1000,
          httpOnly: true,
          secure: true,
        };
        response.cookie('session', sessionCookie, options);
        return response.status(HttpStatus.OK).json({
          user,
        });
      } catch (error) {
        Logger.log(`unexpected Error : ${error}`);
      }
    } else {
      Logger.log('invalid token received');
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'invalid token received',
      });
    }
  }
}
