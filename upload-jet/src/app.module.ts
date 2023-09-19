import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadPolicyModule } from './upload-policy/upload-policy.module';
import { IdentityModule } from './identity/identity.module';
import awsConfig from './config/aws.config';
import appConfig from './config/app.config';
import { LoggerModule } from 'nestjs-pino';
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import databaseConfig from 'config/database.config';
import oauthConfig from 'config/oauth.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from 'shared/auth/authentication.middleware';
import { ApplicationModule } from 'application/application.module';
import { HttpExceptionFilter } from 'shared/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ValidationService } from 'shared/validation.service';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        autoLoadEntities: true
      })
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
        redact: ['req.headers.authorization'],
        quietReqLogger: true
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, awsConfig, databaseConfig, oauthConfig]
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app.jwt.secret'),
          signOptions: { expiresIn: '1h', issuer: 'upload-jet' }
        };
      },
      inject: [ConfigService]
    }),
    UploadPolicyModule,
    ApplicationModule,
    IdentityModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    ValidationService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('identity/callback')
      .forRoutes('*');
  }
}
