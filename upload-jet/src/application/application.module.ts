import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import Application from './application.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IdentityModule } from 'identity/identity.module';
import { ApiKeyService } from './api-key.service';
@Module({
  controllers: [ApplicationController],
  imports: [MikroOrmModule.forFeature([Application]), IdentityModule],
  providers: [ApplicationService, ApiKeyService]
})
export class ApplicationModule {}
