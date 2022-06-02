import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private loginService:LoginService){}

    @Post("login")
    async login(@Body() loginBody:LoginRequestDto){
        return await this.loginService.login(loginBody);
    }

}
