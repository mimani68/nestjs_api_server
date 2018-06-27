import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { IUser } from '../../data/interface';

@Injectable()
export class AuthService {

    private secretKey: string;

    constructor(private readonly userService: UserService) {
        this.secretKey = process.env.TOKEN_SECRET_KEY || 'ali@ba*j5%sdw';
    }

    async createToken( user: IUser ) {
        // console.log('auth.service :: createToken :: user > ', user);
        const userLoged = await this.userService.findUserByQuery( user );
        // console.log('auth.service :: createToken :: userLoged > ', userLoged);
        if ( userLoged ) {
            const payload = {
                password: userLoged.password,
                username: userLoged.username,
                role: userLoged.password,
            };
            const token = await jwt.sign(payload, this.secretKey , { expiresIn: 36000 });
            return {
                error: false,
                token,
                user_identity: userLoged,
            };
        } else {
            return {
                error: true,
                message: 'چنین کاربری یافت نشد',
            };
        }
    }

    /**
     * decode strign token then return user
     * @param token string token that generate in server (JWT)
     * @returns user
     */
    async validateUser( token: string ) {
        console.log('auth.service.ts :: validateUser :: token > ', token);
        const payload: any = await jwt.verify( token, this.secretKey );
        console.log('auth.service.ts :: validateUser :: payload > ', payload);
        // const user = await this.userService.findUserById( payload.id );
        const user = await this.userService.findUserByQuery({ username: payload.username, password: payload.password });
        console.log('auth.service.ts :: validateUser :: user > ', user);
        return user;
    }
}
