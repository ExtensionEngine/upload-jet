import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { HttpModule } from '@nestjs/axios';
import Application from './application.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ZodService } from 'shared/zod.service';

@Module({
  controllers: [ApplicationController],
  imports: [HttpModule, MikroOrmModule.forFeature([Application])],
  providers: [ApplicationService, ZodService]
})
export class ApplicationModule {}
