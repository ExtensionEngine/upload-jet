import { Controller, Get, Inject, Query, Redirect } from '@nestjs/common';
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
  async login(@Query('code') code: string, @Query('state') state: string) {
    await this.identityService.authorize(code);
    const { targetUrl = '/' } = JSON.parse(state);
    const redirectUrl = new URL(targetUrl, this.config.appUrl).href;
    return { url: redirectUrl };
  }
}
