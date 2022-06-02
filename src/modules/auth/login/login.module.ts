import { Module } from '@nestjs/common';
import { usersProviders, usersSessionsProviders } from 'src/providers/users.providers';
import { JwtHelper } from 'src/utils/jwt.helper';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({

  controllers: [LoginController],
  providers: [LoginService,...usersProviders,...usersSessionsProviders,JwtHelper]
})
export class LoginModule {}
