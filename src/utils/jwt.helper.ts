import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { user } from '../entities/user.entity';
import { JwtTokenInterface } from '../interfaces/jwt.token.interface';
import { UserSessions } from '../entities/users.sessions.entity';

@Injectable()
export class JwtHelper {
    public async generateToken(tokenDto: JwtTokenInterface): Promise<string> {
        const token = jwt.sign(tokenDto, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRED_TIME,
        });
        return token;
    }

    public async verify(token: string): Promise<false | JwtTokenInterface> {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_SECRET,
            ) as JwtTokenInterface;
            payload['token'] = token;
            const session = await UserSessions.findOne({
                where: { jwttoken: token },
                include: [
                    {
                        model: user,
                        required: true,
                    },
                ],
            });
            if (!session) {
                return false;
            }
            return payload as JwtTokenInterface;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    
    public getTokenFromHeader(request: Request): string {
        let token: any =
            request.headers['x-access-token'] || request.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            // Remove Bearer from string
            return (token = token.slice(7, token.length));
        }
        return token;
    }
}









