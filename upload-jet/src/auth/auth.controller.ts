import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { MockedUser } from './userTable';
import { Permissions } from './permission.decorator';
import { PermissionsGuard } from './permissions.guard';

// TODO: retrieve an actual user from the database, for now use mocked user
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate')
  async generateToken(
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    const accessToken = await this.authService.generateJwtToken(MockedUser);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });

    return { message: 'success' };
  }

  @UseGuards(PermissionsGuard)
  @Get('protected')
  @Permissions('CreateApp')
  grantAccess() {
    return 'Access granted';
  }
}
