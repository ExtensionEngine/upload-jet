import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CheckAbilities } from './authorization/authorization.decorator';
import { AbilitiesGuard } from './authorization/authorization.guard';
import { MockedApp, MockedUser } from './mockedDBData';
import { Payload } from './jwt.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate')
  async generateToken(@Res({ passthrough: true }) res: Response) {
    const payload: Payload = {
      id: MockedUser.id,
      role: MockedUser.role
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    res.status(200);
  }

  @Get('protected')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(
    { action: 'delete', subjects: MockedApp },
    { action: 'create', subjects: MockedApp }
  )
  grantAccess() {
    return 'Access granted';
  }
}
