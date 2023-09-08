import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtMiddleware } from './jwt.middleware';
import { PermissionService } from './permission.service';

@Module({
  controllers: [],
  providers: [AuthService, PermissionService],
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
