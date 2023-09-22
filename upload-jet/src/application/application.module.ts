import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import Application from './application.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApiKeyMiddleware } from './api-key.middleware';
@Module({
  controllers: [ApplicationController],
  imports: [MikroOrmModule.forFeature([Application])],
  providers: [ApplicationService]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        'applications/generate-api-key',
        'applications/delete-api-key'
      );
  }
}
