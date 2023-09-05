import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import oauthConfig from 'config/oauth.config';
import { ConfigType } from '@nestjs/config';

const GITHUB_API_URL = 'https://api.github.com';

type GithubEmail = {
  email: string;
  primary: boolean;
};

type GithubUser = {
  id: number;
  avatar_url: string;
  email?: string;
};

export type GetUserResult = {
  id: number;
  email: string;
  avatarUrl: string;
};

class GithubError extends Error {
  code: string;
  constructor({ message, code }: { message: string; code: string }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

@Injectable()
export class GithubProviderService {
  constructor(
    @Inject(oauthConfig.KEY)
    private readonly config: ConfigType<typeof oauthConfig>,
    private readonly httpService: HttpService
  ) {}

  async getUser(code: string): Promise<GetUserResult> {
    const accessToken = await this.getAccessToken(code);
    const url = new URL('/user', GITHUB_API_URL);
    const headers = { Authorization: `Bearer ${accessToken}` };
    const { data: user } = await firstValueFrom(
      this.httpService.get<GithubUser>(url.href, { headers })
    );
    const { id, avatar_url: avatarUrl } = user;
    if (user.email) return { id, avatarUrl, email: user.email };
    const email = await this.getUserEmail(accessToken);
    return { id, avatarUrl, email };
  }

  async getUserEmail(accessToken: string): Promise<string> {
    const url = new URL('/user/emails', GITHUB_API_URL);
    const headers = { Authorization: `Bearer ${accessToken}` };
    const { data: emails } = await firstValueFrom(
      this.httpService.get<GithubEmail[]>(url.href, { headers })
    );
    if (!emails?.length) {
      throw new GithubError({
        code: 'email_not_found',
        message: 'Github email is not found for user'
      });
    }
    const { email } = emails.find(email => email.primary) ?? emails[0];
    return email;
  }

  private async getAccessToken(code: string): Promise<string> {
    const url = new URL('https://github.com/login/oauth/access_token');
    const headers = { Accept: 'application/json' };
    const requestBody = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code
    };
    const { data: result } = await firstValueFrom(
      this.httpService.post(url.href, requestBody, { headers })
    );
    if (result.error) {
      const { error: code, error_description: message } = result;
      throw new GithubError({ code, message });
    }
    return result.access_token;
  }
}
