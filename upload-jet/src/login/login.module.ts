import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  imports: [HttpModule],
  providers: [LoginService]
})
export class LoginModule {}
