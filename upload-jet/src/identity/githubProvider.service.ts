import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'nestjs-pino';

const GITHUB_API_URL = 'https://api.github.com';

type GithubEmail = {
  email: string;
  primary: boolean;
};

type GithubUser = {
  id: number;
  email: string | null;
  avatar_url: string;
};

@Injectable()
export class GithubProviderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
  ) {}

  async getAccessToken(code: string): Promise<string> {
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

    return accessTokenResult.access_token;
  }

  async getUser(code: string): Promise<GithubUser> {
    const accessToken = await this.getAccessToken(code);
    if (!accessToken) return null;

    const url = new URL('/user', GITHUB_API_URL);
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    const { data: user } = await firstValueFrom(
      this.httpService.get<GithubUser>(url.href, { headers })
    );

    if (user?.email) return user;

    const email = await this.getUserEmail(accessToken);
    user.email = email;

    console.log(user);

    return user;
  }

  async getUserEmail(accessToken: string) {
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
