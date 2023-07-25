import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadPolicyModule } from './upload-policy/upload-policy.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UploadPolicyModule],
  controllers: [],
  providers: []
})
export class AppModule {}
