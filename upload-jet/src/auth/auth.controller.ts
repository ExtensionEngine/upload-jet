import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { App, AppData, User } from 'auth/auth.types';
import { AbilityFactory } from 'ability/ability.factory';
import { CheckAbilities } from 'ability/abilities.decorator';
import { AbilitiesGuard } from 'ability/abilities.guard';

// TODO: retrieve an actual user and app from the database, for now use mocked user and mocked app
export const MockedUser: User = {
  id: 1,
  login: 'MockedUser1',
  email: 'mocked.user1@gmail.com',
  role: 'User'
};
const appPayload: AppData = {
  id: 2,
  userId: 2,
  name: 'MyApp'
};
export const MockedApp = new App(appPayload);

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private abilityFactory: AbilityFactory
  ) {}

  @Get('generate')
  async generateToken(@Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.generateJwtToken(MockedUser);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    res.status(200);
  }

  // TODO: Add middleware to check and extract user from jwt token

  @Get('protected')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(
    { action: 'delete', subjects: MockedApp },
    { action: 'create', subjects: MockedApp }
  )
  someFuntion() {
    return 'Access granted';
  }
}
