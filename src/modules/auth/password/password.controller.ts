import { Controller,Body,Req, Put, Post, Param, Get } from '@nestjs/common';
import { ChangePasswordDto, mailDto, resetPasswordDto } from './dto/change.password.dto';
import { PasswordService } from './password.service';
import { Request } from 'express';
import { updateProfileDto } from './dto/update.profile.dto';

@Controller()
export class PasswordController {
    constructor(private passwordService:PasswordService){}

    @Put('changepassword')
    async changePassword(@Body() password: ChangePasswordDto,@Req() req: Request,
    ) {
        return await this.passwordService.changePassword(password, req);
    }

    @Post('forgotpassword')
    async forgotPassword(@Body() mailDto:mailDto) {
    return await this.passwordService.forgotPassword(mailDto)
    }

    @Post('resetpassword/:token')
    async setPassword(@Param('token') token:string , @Body() password: resetPasswordDto, @Req() req: Request) {
    return await this.passwordService.resetPassword(token ,password, req);
  }

  @Get('getProfile')
  async getProfile(@Req() req: Request) {
    return await this.passwordService.getProfile(req);
  }

  @Put('updateProfile')
  async updateProfile(@Body() updatePasswordDto:updateProfileDto,@Req() req: Request){
    return await this.passwordService.updateProfile(updatePasswordDto,req)
  }
}
