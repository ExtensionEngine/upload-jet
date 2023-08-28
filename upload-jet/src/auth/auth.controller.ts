import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CheckAbilities } from './ability/abilities.decorator';
import { AbilitiesGuard } from './ability/abilities.guard';
import { MockedApp, MockedUser } from './mockedDBData';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate')
  async generateToken(@Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.generateJwtToken(MockedUser);
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
