import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import Application from './application.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
@Module({
  controllers: [ApplicationController],
  imports: [MikroOrmModule.forFeature([Application])],
  providers: [ApplicationService]
})
export class ApplicationModule {}
