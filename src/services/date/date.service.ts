import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {

    showDate() {
        return new Date();
    }

}
