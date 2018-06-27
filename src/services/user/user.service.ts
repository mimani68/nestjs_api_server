import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from '../../data/interface';
import { ObjectID } from 'bson';

@Injectable()
export class UserService {

    constructor( @InjectModel('User') private readonly userModel: Model<IUser> ) {}

    async findOneByEmail( arg: any ) {
        return { name: 'mahdi', email: 'imani@yahoo.com' };
    }

    async findAllUser(): Promise<Array<IUser>> {
        return await this.userModel.find().exec();
    }

    async findUserByQuery( query: any ): Promise<IUser> {
        console.log('user.service.ts :: findUserById :: query:any >> ', query );
        return await this.userModel.findOne( query ).exec();
    }

    async findUserById( hexalDecimalId: string ): Promise<Array<IUser>> {
        console.log('user.service.ts :: findUserById :: >> ', hexalDecimalId );
        return await this.userModel.find({ _id: new ObjectID( hexalDecimalId ) }).exec();
    }

    async saveNewUser( newUser ) {
        const userCreated = new this.userModel( newUser );
        return await userCreated.save();
    }

}
