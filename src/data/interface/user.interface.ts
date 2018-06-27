
import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly name: string;
    readonly family: string;
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly phone: Array<any>;
    readonly birthday: string;
    readonly verificationCode: string;
    readonly updateTime: Array<string>;
}
