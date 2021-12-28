import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ResponseSaveUser } from './user.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:uid')
  async getUserByUid(@Res() response, @Param('uid') uid) {
    const user = await this.userService.getUser(uid);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Get('/me')
  async getUser(@Req() request, @Res() response) {
    const user = await this.userService.getUser(request.user.uid);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Post('/save')
  async saveUser(
    @Req() request,
    @Res() response,
    @Body() user: ResponseSaveUser,
  ) {
    const result = await this.userService.saveUser(request.user.uid, user);
    if (result.affected > 0) {
      return response.status(HttpStatus.OK).json({
        affected: result.affected,
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST);
    }
  }
}
