import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { GithubProviderService } from 'identity/github-provider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [IdentityController],
  imports: [HttpModule],
  providers: [IdentityService, GithubProviderService]
})
export class IdentityModule {}
