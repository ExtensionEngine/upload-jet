import { Controller, Get, Inject, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import appConfig from 'config/app.config';
import { ConfigType } from '@nestjs/config';
import { IdentityService } from './identity.service';
import { JWTPayload } from 'auth/jwt.types';

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
    const userProfile = await this.identityService.getUserProfile(code);
    const user = await this.identityService.hydrateUser(userProfile);
    const payload: JWTPayload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    const accessToken = await this.identityService.generateAccessToken(payload);
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    const { targetUrl = '/' } = JSON.parse(state);
    const redirectUrl = new URL(targetUrl, this.config.appUrl).href;
    return { url: redirectUrl };
  }
}
