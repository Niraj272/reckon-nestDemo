import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register.request.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(private  registerservice:RegisterService){}

    @Post()
    async register(@Body() registerBody:RegisterRequestDto){
        return await this.registerservice.register(registerBody);
    }
}
