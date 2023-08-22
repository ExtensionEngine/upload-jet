import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadPolicyModule } from './upload-policy/upload-policy.module';
import { LoginModule } from './login/login.module';
import awsConfig from './config/aws.config';
import appConfig from './config/app.config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
        redact: ['req.headers.authorization'],
        quietReqLogger: true
      }
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, awsConfig] }),
    UploadPolicyModule,
    LoginModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
