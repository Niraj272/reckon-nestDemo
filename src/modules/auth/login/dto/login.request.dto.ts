import { IsNotEmpty , IsEmail, MinLength, MaxLength } from "class-validator";

export class LoginRequestDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    readonly password: string;    
}  

// export class usernameDto{
//     @IsNotEmpty()
//     readonly user_name: string;

//     @MinLength(8)
//     @MaxLength(24)
//     @IsNotEmpty()
//     readonly password: string;
// }     