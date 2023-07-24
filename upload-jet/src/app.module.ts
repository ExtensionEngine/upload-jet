import { Module } from '@nestjs/common';
import { PostPolicyModule } from './post-policy/post-policy.module';

@Module({
  imports: [PostPolicyModule],
  controllers: [],
  providers: []
})
export class AppModule {}
