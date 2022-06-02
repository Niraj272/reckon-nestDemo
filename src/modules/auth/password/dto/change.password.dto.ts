import { IsNotEmpty, IsString, MaxLength, MinLength,IsEmail } from "class-validator";

export class ChangePasswordDto{
    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    readonly oldPassword: string;

    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    readonly newPassword: string;    
}  

export class mailDto{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
}

export class resetPasswordDto{
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}