import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import appConfig from 'config/app.config';
import { ConfigType } from '@nestjs/config';
import { IdentityService } from './identity.service';
import { hasPermission } from 'shared/auth/authorization';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';

@Controller('identity')
@UseGuards(PermissionGuard)
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
  async me(@Req() req: Request) {
    const identity = await this.identityService.get(req.userId);
    if (!hasPermission(req.permissions, 'read', identity)) {
      throw new ForbiddenException();
    }
    return identity;
  }

  @Get('simple')
  @Permission('read', 'Identity')
  async simple() {
    return 'ok';
  }

  @Get('signout')
  @Redirect()
  async signout(@Res({ passthrough: true }) res: Response) {
    const redirectUrl = this.config.appUrl;
    res.clearCookie('access_token');
    return { url: redirectUrl };
  }
}
