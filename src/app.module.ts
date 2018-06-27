import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { AppService } from 'app.service';
import {
  DateService,
  AuthService,
  UserService,
  ItemService } from 'services';

import { JwtStrategy } from 'auth/jwt.strategy';
import { RolesGuard } from 'auth/role.can-active';

import { UserSchema } from 'data/schema';
import { ItemSchema } from 'data';

import { AppController } from 'app.controller';
import { AboutController } from 'controller/about.controller';
import { UserController } from 'controller/user.controller';
import { ItemController } from 'controller/item.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestCms'),
    MongooseModule.forFeature([
      { name: 'Item', schema: ItemSchema },
      { name: 'User', schema: UserSchema }
    ]) ],
  controllers: [
    AppController,
    AboutController,
    UserController,
    ItemController
  ],
  providers: [
    AppService,
    DateService,
    AuthService,
    UserService,
    ItemService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }],
})
export class AppModule {}
