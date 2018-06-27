import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AppService } from 'app.service';
import { IUser } from '../data/interface';
import { Roles } from '../auth/roles.decorator';

@ApiUseTags('users')
@Controller('user')
export class UserController {

  constructor( private appService: AppService ) {}

  @Get('')
  public async findUser( ): Promise<Array<IUser>> {
    return await this.appService.user.findAllUser();
  }

  // DISABLE: for security usage
  // @Get('id/:id')
  // async findUserById( @Param() urlParam: any ): Promise<Array<IUser>> {
  //   return await this.appService.user.findUserById( urlParam.id );
  // }

  @Post('token')
  public async generateToken( @Body() user: IUser ): Promise<any> {
    return await this.appService.auth.createToken( user );
  }

  @Post('signin')
  public async signin( @Body() user: IUser ): Promise<any> {
    const userLoginViewModel = {
      password: user.password,
      username: user.username,
    };
    return await this.appService.user.findUserByQuery( userLoginViewModel );
  }

  @Post('signup')
  public async storeUser(@Body() body): Promise<IUser> {
    return await this.appService.user.saveNewUser( body );
  }

  @Get('sample')
  // @UseGuards(AuthGuard('jwt'))           // only all jqt user
  // @UseGuards(AdminGuard)                 // role-based auth
  // @ReflectMetadata('roles', ['admin'])   // use role.decorator.ts instead of
  @Roles('user')
  public async sampleProtectedPage( @Body() body ) {
    return { user: body };
  }
}
