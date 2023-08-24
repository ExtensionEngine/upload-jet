import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { GithubProviderModule } from 'github/githubProvider.module';

@Module({
  controllers: [IdentityController],
  imports: [GithubProviderModule],
  providers: [IdentityService]
})
export class IdentityModule {}
