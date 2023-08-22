import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly loginService: IdentityService) {}

  @Get('callback')
  @Redirect()
  async login(@Req() request) {
    await this.loginService.authorize(request.query.code);

    const callbackUrl = new URL(process.env.APP_URL).href;
    return { url: callbackUrl };
  }
}
