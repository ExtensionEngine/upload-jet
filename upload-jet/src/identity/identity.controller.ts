import { Controller, Get, Inject, Redirect, Req } from '@nestjs/common';
import { IdentityService } from './identity.service';
import appConfig from 'config/app.config';
import { ConfigType } from '@nestjs/config';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
    private readonly identityService: IdentityService
  ) {}

  @Get('callback')
  @Redirect()
  async login(@Req() request) {
    const { code, state } = request.query;
    await this.identityService.authorize(code);

    const redirectRoute = state || '/';
    const redirectUrl = new URL(redirectRoute, this.config.appUrl).href;
    return { url: redirectUrl };
  }
}
