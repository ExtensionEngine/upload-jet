import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as querystring from 'querystring';
import { Logger } from 'nestjs-pino';
import { GithubEmail } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
  ) {}

  async getAccessToken(code: string) {
    const result = await firstValueFrom(
      this.httpService.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
      })
    );

    const accessTokenResult = querystring.parse(result.data);

    if (accessTokenResult.error) {
      this.logger.error(accessTokenResult);
      return null;
    }

    return accessTokenResult.access_token.toString();
  }

  async getGithubUser(accessToken: string) {
    const { data: user } = await firstValueFrom(
      this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    );

    if (!user.email) {
      const email = await this.getGithubUserPrimaryEmail(accessToken);
      user.email = email;
    }

    return user;
  }

  async getGithubUserPrimaryEmail(accessToken: string) {
    const { data: emails } = await firstValueFrom(
      this.httpService.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    );

    const primaryEmail: GithubEmail = emails.find(
      (email: GithubEmail) => email.primary
    );

    return primaryEmail.email;
  }
}
