import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtMiddleware } from './jwt.middleware';
import { PermissionService } from './permission.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, PermissionService],
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
