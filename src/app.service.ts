import { Injectable } from '@nestjs/common';
import {
  AuthService,
  DateService,
  UserService,
  ItemService } from 'services';

@Injectable()
export class AppService {

  constructor(
    public auth: AuthService,
    public date: DateService,
    public user: UserService,
    public itemsService: ItemService
   ) {}

  root(): string {
    return 'Hello World!';
  }

}
