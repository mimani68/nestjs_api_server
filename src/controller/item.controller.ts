import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitQuery, ApiImplicitParam, ApiImplicitBody } from '@nestjs/swagger';

import { AppService } from 'app.service';
import { IApi } from '../data/interface';
import { Item } from './../data';
import { Roles } from '../auth/roles.decorator';

@ApiUseTags('items')
@Controller('item')
export class ItemController {

    constructor( private appService: AppService ) {}

    @Get('all')
    @ApiImplicitQuery({ name: 'page', type: 'number' })
    @ApiImplicitQuery({ name: 'limit', type: 'number' })
    @ApiOperation({ title: 'همه محصولات' })
    public async showAllItems( @Query() _query ): Promise<IApi<Item>> {
        const r = await this.appService.itemsService.findAllItem();
        const e: IApi<Item> = {
            result: r,
            query: _query ? _query : 'هیچ پارامتری ارسال نشده است',
            error: false,
            createTime: new Date()
        };
        return e;
    }

    @Get('id/:id')
    @ApiImplicitParam({ name: 'id', type: 'number' })
    @ApiOperation({ title: 'درخواست سفارشی یک محصول بکمک آی دی' })
    public async showItemById( @Param() _id: string ) {
        const e: IApi<Item> = {
            params: _id,
            error: false,
            result: {
                title: 'مداد',
                vendor: 'استدلر',
                price: 2000,
                attribute: [{
                    title: 'ابعاد',
                    value: 200
                }],
                createdAt: new Date(),
            },
            createTime: new Date()
        };
        return e;
    }

    @Post('')
    @Roles('admin', 'super_user')
    // @ApiProduces('title', 'vendor', 'price', 'attribute', 'createdAt')
    // error in handleing ApiImplicitBody()
    // @ApiImplicitBody({ name: 'title', type: 'string', required: false })
    // @ApiImplicitBody({ name: 'vendor', type: 'string', required: false })
    // @ApiImplicitBody({ name: 'vendor', type: 'string' })
    // @ApiImplicitBody({ name: 'price', type: 'number' })
    // @ApiImplicitBody({ name: 'attribute', type: 'array' })
    // @ApiImplicitBody({ name: 'createdAt', type: 'string' })
    public async sampleProtectedPage( @Body() _body: Item ) {
        const r = await this.appService.itemsService.saveNewItem( _body );
        const e: IApi = {
            error: false,
            result: r,
            createTime: new Date()
        };
        return e;
    }
}
