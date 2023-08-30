import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtMiddleware } from './jwt.middleware';
import { AuthorizationFactory } from './authorization.factory';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationFactory],
  imports: [
    JwtModule.registerAsync({
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app.jwt.secret')
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('auth/protected');
  }
}
