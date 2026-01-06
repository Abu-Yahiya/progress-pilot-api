import { UserService } from '@/src/api/user/user.service';
import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    if (payload.type !== TokenTypes.REFRESH_TOKEN) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
