import { Controller, Get, Inject, Query, Redirect, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import appConfig from 'config/app.config';
import { ConfigType } from '@nestjs/config';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
    private readonly identityService: IdentityService
  ) {}

  @Get('callback')
  @Redirect()
  async login(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Query('state') state: string
  ) {
    const accessToken = await this.identityService.authorize(code);
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    const { targetUrl = '/' } = JSON.parse(state);
    const redirectUrl = new URL(targetUrl, this.config.appUrl).href;
    return { url: redirectUrl };
  }

  @Get('me')
  me(req: Request) {
    console.log('userId: ', req.userId);
    return 'me';
  }
}
