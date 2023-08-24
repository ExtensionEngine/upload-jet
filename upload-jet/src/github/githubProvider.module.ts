import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GithubProviderService } from './githubProvider.service';

@Module({
  imports: [HttpModule],
  providers: [GithubProviderService],
  exports: [GithubProviderService]
})
export class GithubProviderModule {}
