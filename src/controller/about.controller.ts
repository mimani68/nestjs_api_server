import { Header, HttpCode, HttpStatus } from '@nestjs/common';
import { Controller, Body, Query, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

import { ParseIntPipe } from 'pipe';
import { Roles } from '../auth/roles.decorator';

import { AppService } from 'app.service';

@Controller('public/about')
export class AboutController {

  constructor(
    public appService: AppService,
  ) {}

  @Get('cms')
  root( @Query() query ): object {
      return {
          title: 'salam',
          description: 'inja',
          query: query.time || new Date().toISOString(),
      };
  }

  @Get('main')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  mainPage( @Query() time ): object {
  // root( @Param('id') id, @Query() time ): string {
    // return this.appService.root(id);
    return time;
  }

  @Get('forbiden-page')
  unallowedPage( @Body() body ): object {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('sina')
  // @UsePipes(new JoiValidationPipe(createCatSchema))  // use pipe
  root1( @Body() body ): object {
    return {
      title: body,
    };
  }

  @Get('sample/:id')
  // @ReflectMetadata('roles', ['admin'])
  @Roles('admin')
  // @Render('index.hbs')
  async sample( @Param('id', new ParseIntPipe()) id ): Promise<object> {
    return await {
      id: ( id ) ? id : 1000,
      title: 'salam as sample',
      time: this.appService.date.showDate(),
    };
  }
}
