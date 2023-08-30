import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckAbilities } from './authorization/authorization.decorator';
import { AbilitiesGuard } from './authorization/authorization.guard';
import { MockedApp } from './mockedDBData';

@Controller('auth')
export class AuthController {
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
