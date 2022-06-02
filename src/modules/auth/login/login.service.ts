import { BadRequestException, Inject, Injectable, Req } from '@nestjs/common';
import { USER_REPOSITORY,USER_SESSIONS_REPOSITORY } from 'src/core/constants';
import { user } from 'src/entities/user.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtHelper } from 'src/utils/jwt.helper';
import { UserSessions } from 'src/entities/users.sessions.entity';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class LoginService {
    constructor(@Inject(USER_REPOSITORY) private userrepository: typeof user,  
     @Inject(USER_SESSIONS_REPOSITORY) private readonly USER_SESSIONS_REPOSITORY : typeof UserSessions,
    private readonly jwtToken: JwtHelper
    ) { }
    
    async login(loginBody: LoginRequestDto) {
        const user: user = await this.userrepository.findOne({ where: { email: loginBody.email } })
        if (!user) {
            throw new BadRequestException("Your login information was incorrect. Please check and try again.")
        }
        const tokenDto: JwtTokenInterface = {
            id: user.id,
            email: user.email,
            user_name: user.user_name,
        };
        try {
            if (await bcrypt.compare(loginBody.password, user.password)) {
                const token = await this.jwtToken.generateToken(tokenDto);
                await this.USER_SESSIONS_REPOSITORY.create({ userid: user.id, jwttoken: token });
                
                return { token: token };
            } else {
                return 'incorrect password';
            }
        } catch (error) {
            throw new BadRequestException(
                'Your login ------information was incorrect. Please check and try again.',
            );
        }
    }


}
