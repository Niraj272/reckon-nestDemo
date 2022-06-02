import { IsNotEmpty, IsString, MaxLength, MinLength,IsEmail } from "class-validator";

export class RegisterRequestDto {
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly first_name: string;
    
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly last_name: string;

    @IsString()
    @MinLength(8)
    @MaxLength(25)
    @IsNotEmpty()
    readonly user_name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    readonly password: string;

    readonly user_profile: string;
    
}