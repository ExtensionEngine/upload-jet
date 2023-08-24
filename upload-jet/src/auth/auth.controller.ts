import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from 'express';
import { MockedUser } from './userTable';
import { Permissions } from './permission.decorator';
import { PermissionsGuard } from './permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate')
  async generateToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const access_token = await this.authService.generateJwtToken(MockedUser);
    res.cookie('jwt', access_token, { httpOnly: true });

    return { message: 'success' };
  }

  @UseGuards(PermissionsGuard)
  @Get('protected')
  @Permissions('CreateApp')
  grantAccess() {
    return 'Access granted';
  }
}
