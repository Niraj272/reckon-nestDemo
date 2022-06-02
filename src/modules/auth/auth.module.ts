import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [RegisterModule,LoginModule, PasswordModule],
  controllers: [],
  providers: []
})
export class AuthModule {}
