import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Permissions } from './permission.decorator';
import { AuthorizationGuard } from './authorization.guard';

import { userType } from './auth.types';

const MockedUser: userType = {
  id: 1,
  login: 'MockedUser1',
  email: 'mocked.user1@gmail.com',
  role: 'User'
};

// TODO: retrieve an actual user from the database, for now use mocked user
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate')
  async generateToken(@Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.generateJwtToken(MockedUser);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });

    res.status(200);
  }

  @UseGuards(AuthorizationGuard)
  @Get('protected')
  @Permissions('CreateApp')
  grantAccess() {
    return 'Access granted';
  }
}
