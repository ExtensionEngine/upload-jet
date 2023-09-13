import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { HttpModule } from '@nestjs/axios';
import Application from './application.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ValidationService } from 'shared/validation.service';
import { ApiKeyService } from './api-key.service';
import ApiKey from './api-key.entity';

@Module({
  controllers: [ApplicationController],
  imports: [HttpModule, MikroOrmModule.forFeature([Application, ApiKey])],
  providers: [ApplicationService, ValidationService, ApiKeyService]
})
export class ApplicationModule {}
