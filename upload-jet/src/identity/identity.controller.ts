import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get('callback')
  @Redirect()
  async login(@Req() request) {
    const { code, state } = request.query;
    await this.identityService.authorize(code);

    const redirectRoute = state || '/';
    const redirectUrl = new URL(redirectRoute, process.env.APP_URL).href;
    return { url: redirectUrl };
  }
}
