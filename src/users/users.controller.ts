import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:uid')
  async getUser(@Res() response, @Param('uid') uid) {
    const user = await this.userService.getUser(uid);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }
}
