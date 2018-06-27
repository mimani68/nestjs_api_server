import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from '../services/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly userService: UserService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ali@ba*j5%sdw',
    });
  }

  async validate( payload: any, done: Function) {
    let user = {};
    // console.log('jwt.strategy.ts :: validate :: payload > ', payload);
    try {
        // user = await this.authService.validateUser(token);
        // console.log('jwt.strategy.ts :: validate :: payload > ', payload.username );
        user = await this.userService.findUserByQuery({ username: payload.username, password: payload.password });
        console.log('jwt.strategy.ts :: validate() :: findUserById() ', user);
    } catch (error) {
        console.log('ERROR :: jwt.strategy.ts :: validate()');
        console.log(error);
    }
    if (!user) {
        console.log('jwt.strategy.ts :: validate :: unAuthorized login');
        return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}