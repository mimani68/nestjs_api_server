import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class TestMiddleWareMiddleware implements NestMiddleware {
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      console.log('Request...');
      next();
    };
  }
}
