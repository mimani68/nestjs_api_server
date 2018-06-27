import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectID } from 'bson';
import { IItem } from 'data';

@Injectable()
export class ItemService<T = IItem> {

    constructor( @InjectModel('Item') private readonly itemModel: Model<IItem> ) {}

    async findAllItem(): Promise<Array<IItem>> {
        return await this.itemModel.find().exec();
    }

    async findItemByQuery( query: any ): Promise<IItem> {
        console.log('user.service.ts :: findItemById :: query:any >> ', query );
        return await this.itemModel.findOne( query ).exec();
    }

    async findItemById( hexalDecimalId: string ): Promise<Array<IItem>> {
        console.log('user.service.ts :: findItemById :: >> ', hexalDecimalId );
        return await this.itemModel.find({ _id: new ObjectID( hexalDecimalId ) }).exec();
    }

    async saveNewItem( newItem ) {
        const e = new this.itemModel( newItem );
        return await e.save();
    }

}
