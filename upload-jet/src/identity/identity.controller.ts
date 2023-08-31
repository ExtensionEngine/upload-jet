import { Controller, Get, Inject, Query, Redirect, Res } from '@nestjs/common';
import { IdentityService } from './identity.service';
import appConfig from 'config/app.config';
import { ConfigType } from '@nestjs/config';
import { JWTPayload } from 'authorization/jwt.types';
import { Response } from 'express';

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
    const user = await this.identityService.authorize(code);
    const payload: JWTPayload = {
      id: user.id,
      role: user.role
    };
    const accessToken = await this.identityService.generateJwtToken(payload);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    const { targetUrl = '/' } = JSON.parse(state);
    const redirectUrl = new URL(targetUrl, this.config.appUrl).href;
    return { url: redirectUrl };
  }
}
