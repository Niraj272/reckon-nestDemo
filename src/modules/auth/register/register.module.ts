import { Module } from '@nestjs/common';
import { usersProviders } from 'src/providers/users.providers';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService,...usersProviders]
})
export class RegisterModule {}
