import { ConflictException, Inject, Injectable, Req, RequestTimeoutException } from '@nestjs/common';
import { user } from 'src/entities/user.entity';
import { ChangePasswordDto, mailDto, resetPasswordDto } from './dto/change.password.dto';
import { USER_REPOSITORY, PASS_RESET_REPOSITORY, USER_SESSIONS_REPOSITORY } from 'src/core/constants';
import { UserSessions } from 'src/entities/users.sessions.entity';
import e, { Request } from 'express';
import { JwtHelper } from 'src/utils/jwt.helper';
import { PasswordHelper } from 'src/utils/password.helper';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as random from 'random-token'
import { passReset } from 'src/entities/user.reset.entity';
import {  updateProfileDto } from './dto/update.profile.dto';

@Injectable()
export class PasswordService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly USER_REPOSITORY: typeof user,
        @Inject(USER_SESSIONS_REPOSITORY) private readonly USER_SESSIONS_REPOSITORY: typeof UserSessions,
        @Inject(PASS_RESET_REPOSITORY) private readonly PASS_RESET_REPOSITORY: typeof
            passReset,
        private readonly jwtToken: JwtHelper,
        private readonly password: PasswordHelper,
    ) { }

    async changePassword(password: ChangePasswordDto, req: Request) {
        const oldPassword = password.oldPassword;
        const newPassword = password.newPassword;

        const bearerHeader = req.headers.authorization.replace('Bearer ', '');
        const jwtData = jwt.verify(bearerHeader, process.env.JWT_SECRET);

        const oldUser: user = await this.USER_REPOSITORY.findOne({ where: { email: jwtData["email"] } })
        try {
            if (await this.password.compare(oldPassword, oldUser.password)) {
                const newEncPassword = await this.password.generateSaltAndHash(newPassword);
                console.log(newEncPassword);

                const newHashPassword = newEncPassword.passwordHash;

                const updatePassword = await this.USER_REPOSITORY.update({ password: newHashPassword },
                    { where: { email: jwtData['email'] } })

                return { message: "Password is updated" };
            }
        } catch {
            return { message: "Password Does not Match" };
        }
    }

    async forgotPassword(mailDto) {
        const email = mailDto.email;
        const user = await this.USER_REPOSITORY.findOne({ where: { email } })
        if (user === null) {
            throw new ConflictException('ACCOUNT_NOT_FOUND');
        }
        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD,
                },
                secure: true,
                tls: {
                    rejectUnauthorized: false,
                },
            });
            let random_token = random(16);
            console.log(random_token);

            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: mailDto.email,
                subject: 'Change Password',
                html: `<h1>Change Password</h1> <a href="http://127.0.0.1:3000/resetpassword/${random_token}">Click here</a>`,
            };

            const addtopassReset = await this.PASS_RESET_REPOSITORY.create({ userid: user.id, random_token: random_token });

            await transporter.sendMail(mailOptions, (err, result) => {
                console.log("mail sent");
                if (err) {
                    throw err;
                }
            });
            return { message: 'Mail Sent' };
        } else {
            console.log("invalid mail");
            return { message: 'Invalid Email' };
        }
    }

    async resetPassword(token: string, password: resetPasswordDto, @Req() req: Request) {
        console.log(token);
        const a = await this.PASS_RESET_REPOSITORY.findOne({ where: { random_token: token } });
        console.log(a);

        if (a && a.random_token == token) {
            const newPassword = password.newPassword;
            const newEncPassword = await this.password.generateSaltAndHash(newPassword);
            const newHashPassword = newEncPassword.passwordHash;

            console.log(newPassword);
            console.log(newHashPassword);
            if (await this.password.compare(newPassword, newHashPassword)) {
                const updateForgetPassword = await this.USER_REPOSITORY.update({ password: newHashPassword }, { where: { id: a['userid'] } });
                console.log(updateForgetPassword);
                return { message: 'Password Updated Successfully' };
            }
        }
        else {
            return { message: 'ACCOUNT_NOT_FOUND' }
        }

        // const bearerHeader = req.headers.authorization.replace('Bearer ', '');
        // const jwtData = jwt.verify(bearerHeader, process.env.JWT_SECRET);
        // const updateForgetPassword = await this.USER_REPOSITORY.update({password: newHashPassword},{where: { email: jwtData['email'] }});


    }

    // async getProfileByEmail(email) {
    //     console.log(email);

    //     try {
    //         const getProfile = await this.USER_REPOSITORY.findOne({
    //             attributes: ["id", "first_name", "last_name", "user_name", "email", "password", "user_profile"],
    //             where: { ...email }
    //         });
    //         if (!getProfile) {
    //             return {Profile:"ACCOUNT_NOT_FOUND"}
    //         }
    //         else {
    //             return { Profile: getProfile }
    //         }
    //     } catch (error) {

    //         return error;
    //     }
    // }

    async getProfile(req) {
        const bearerHeader = req.headers.authorization.replace('Bearer ', '');
        const jwtData = jwt.verify(bearerHeader, process.env.JWT_SECRET);

        const getProfile  = await this.USER_REPOSITORY.findOne({attributes:["id","first_name","last_name","user_name","email","password","user_profile"], where: { id: jwtData["id"] } })
        try {
            if(getProfile){
                return { Profile: getProfile}
            }
        } catch (error) {
            return error;
        }
    }

    async updateProfile(updateProfileDto : updateProfileDto,req){
        const bearerHeader = req.headers.authorization.replace('Bearer ', '');
        const jwtData = jwt.verify(bearerHeader, process.env.JWT_SECRET);

         const update = await this.USER_REPOSITORY.update({
            first_name: updateProfileDto.first_name,
            last_name: updateProfileDto.last_name,
            user_name: updateProfileDto.user_name, 
            user_profile: updateProfileDto.user_profile},
             {where:{ email: jwtData["email"] }} );
        
        return {message: "PROFILE_UPDATE_SUCCESSFULLY"}
         
    }

}


