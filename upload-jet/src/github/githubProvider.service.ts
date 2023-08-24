import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as querystring from 'querystring';
import { Logger } from 'nestjs-pino';
import { GithubEmail } from './githubProvider.dto';

const GITHUB_API_URL = 'https://api.github.com';

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

    const result = await firstValueFrom(
      this.httpService.post(
        new URL('https://github.com/login/oauth/access_token').href,
        requestBody
      )
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
