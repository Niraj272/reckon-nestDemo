import { Module } from '@nestjs/common';
import { passResetProviders, usersProviders, usersSessionsProviders } from 'src/providers/users.providers';
import { JwtHelper } from 'src/utils/jwt.helper';
import { PasswordHelper } from 'src/utils/password.helper';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService,...usersProviders,...usersSessionsProviders,...passResetProviders,JwtHelper,PasswordHelper]
})
export class PasswordModule {}
