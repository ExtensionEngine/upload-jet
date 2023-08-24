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
    const { data: user } = await firstValueFrom(
      this.httpService.get(new URL('/user', GITHUB_API_URL).href, {
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
      this.httpService.get(new URL('/user/emails', GITHUB_API_URL).href, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    );

    const primaryEmail: GithubEmail = emails.find(
      (email: GithubEmail) => email.primary
    );

    return primaryEmail ? primaryEmail.email : emails[0].email;
  }
}
