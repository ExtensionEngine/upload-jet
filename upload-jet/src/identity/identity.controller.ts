import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Controller('login')
export class IdentityController {
  constructor(private readonly loginService: IdentityService) {}

  @Get('callback')
  @Redirect()
  async login(@Req() request) {
    const accessToken = await this.loginService.getAccessToken(
      request.query.code
    );

    if (accessToken) {
      // TODO: Use this data to verify if user exists in our database
      const user = await this.loginService.getGithubUser(accessToken);
      console.log('GITHUB_USER', user);
    }

    const callbackUrl = new URL('logincallback', process.env.APP_URL).href;
    return { url: callbackUrl };
  }
}
