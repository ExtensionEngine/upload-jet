import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'nestjs-pino';

const GITHUB_API_URL = 'https://api.github.com';

type GithubEmail = {
  email: string;
  primary: boolean;
};

@Injectable()
export class GithubProviderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
  ) {}

  async getAccessToken(code: string) {
    const requestBody = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    };

    const { data: accessTokenResult } = await firstValueFrom(
      this.httpService.post(
        new URL('https://github.com/login/oauth/access_token').href,
        requestBody,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
    );

    if (accessTokenResult.error) {
      this.logger.error(accessTokenResult);
      return null;
    }

    return accessTokenResult.access_token.toString();
  }

  async getGithubUser(accessToken: string) {
    const url = new URL('/user', GITHUB_API_URL);
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    const { data: user } = await firstValueFrom(
      this.httpService.get(url.href, { headers })
    );

    if (!user.email) {
      const email = await this.getGithubUserPrimaryEmail(accessToken);
      user.email = email;
    }

    return user;
  }

  async getGithubUserPrimaryEmail(accessToken: string) {
    const url = new URL('/user/emails', GITHUB_API_URL);
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    const { data: emails } = await firstValueFrom(
      this.httpService.get<GithubEmail[]>(url.href, { headers })
    );

    if (!emails || !emails.length) {
      this.logger.error('User email not found');
      return null;
    }

    const { email } = emails.find(email => email.primary) ?? emails[0];
    return email;
  }
}
