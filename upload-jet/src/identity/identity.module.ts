import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { GithubProviderService } from 'identity/github-provider.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Identity from './identity.entity';
import { AuthorizationService } from './authorization.service';

@Module({
  controllers: [IdentityController],
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app.jwt.secret'),
          signOptions: { expiresIn: '1h', issuer: 'upload-jet' }
        };
      },
      inject: [ConfigService]
    }),
    MikroOrmModule.forFeature([Identity])
  ],
  providers: [IdentityService, AuthorizationService, GithubProviderService]
})
export class IdentityModule {}
