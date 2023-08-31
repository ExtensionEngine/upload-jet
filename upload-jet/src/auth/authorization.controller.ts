import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckAbilities } from './authorization.decorator';
import { AuthorizationGuard } from './authorization.guard';
import { ApplicationData } from './auth.types';
import { Application } from './auth.entities';

const appPayload: ApplicationData = {
  id: 2,
  userId: 3,
  name: 'MyApp'
};
export const MockedApp = new Application(appPayload);

@Controller('auth')
export class AuthorizationController {
  @Get('protected')
  @UseGuards(AuthorizationGuard)
  @CheckAbilities(
    { action: 'delete', subjects: MockedApp },
    { action: 'create', subjects: MockedApp }
  )
  grantAccess() {
    return 'Access granted';
  }
}
