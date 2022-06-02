import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { USER_REPOSITORY } from 'src/core/constants';
import { user } from 'src/entities/user.entity';
import { RegisterRequestDto } from './dto/register.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
    constructor(@Inject(USER_REPOSITORY) private userrepository: typeof user) { }

    async register(registerBody: RegisterRequestDto) {
        let email = registerBody.email.toLowerCase();
        let user_name = registerBody.user_name;

        const user = await this.userrepository.findOne({ where: { email } });

        if (user && user.email.toLowerCase() == email) {
            throw new ConflictException('ACCOUNT EXISTS')
        }

        try {
            if (!(email && user_name)) {
                return { message: "PLEASE FILL VALUE" }
            }
            else {
                const salt = 10;
                const hashedPassword = await bcrypt.hash(registerBody.password, salt);

                return await this.userrepository.create({
                    first_name: registerBody.first_name,
                    last_name: registerBody.last_name,
                    user_name: registerBody.user_name,
                    email: registerBody.email.toLowerCase(),
                    password: hashedPassword,
                    user_profile: registerBody.user_profile
                });
            }
        } catch (error) {
            return { message: "Enter valid data" }

        }



    }
}
