import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterRequestDto } from './dto/register.request.dto';
import { RegisterService } from './register.service';
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from 'src/utils/img.helper';
@Controller('register')
export class RegisterController {
    constructor(private  registerservice:RegisterService){}

    @Post()
    @UseInterceptors(FileInterceptor('avtar', {
        storage: diskStorage({
            destination: './avtar',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }
    ))
    async register(@UploadedFile() file,@Body() registerBody:RegisterRequestDto){
        console.log(file.path);
        
        return await this.registerservice.register(file.path,registerBody);
    }
}
