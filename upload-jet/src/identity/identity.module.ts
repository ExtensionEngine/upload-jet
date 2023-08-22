import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { HttpModule } from '@nestjs/axios';
import { IdentityService } from './identity.service';

@Module({
  controllers: [IdentityController],
  imports: [HttpModule],
  providers: [IdentityService]
})
export class IdentityModule {}
