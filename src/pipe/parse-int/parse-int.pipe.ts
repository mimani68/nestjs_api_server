import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  Injectable,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

export class ParseIntPipe implements PipeTransform < any > {
  transform(value: any, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}