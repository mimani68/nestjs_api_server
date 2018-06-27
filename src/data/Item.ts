
import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IItem extends mongoose.Document {
    readonly title: string;
    readonly vendor: string;
    readonly price: number | string;
    readonly attribute: Array<any>;
    readonly createdAt: Date;
}

export class Item {
    @ApiModelProperty({ required: false, description: 'چیزی برای گفتن نیست', default: 'نام لوازم تحریر' })
    readonly title: string;
    @ApiModelProperty()
    readonly vendor: string;
    @ApiModelProperty()
    readonly price: number | string;
    @ApiModelProperty()
    readonly attribute: Array<any>;
    @ApiModelProperty()
    readonly createdAt: Date;
}

export const ItemSchema = new mongoose.Schema({
    title: String,
    vendor: String,
    price: Number,
    attribute: Array,
    createdAt: Date,
});
