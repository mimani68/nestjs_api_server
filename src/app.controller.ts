import { Get, Controller } from '@nestjs/common';
import { AppService } from 'app.service';

@Controller('public')
export class AppController {

  constructor(
    private appService: AppService,
  ) {
  }

  @Get('/home')
  main(): string {
    return 'salam';
  }

}
