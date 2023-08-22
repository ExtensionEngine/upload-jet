import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

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

    return { url: 'http://localhost:8080/logincallback' };
  }
}
