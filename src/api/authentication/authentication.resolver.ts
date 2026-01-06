import { ApiCommonActionOutput } from '@/src/shared/common/api-response';
import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { USER_ROLE } from '../user/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import {
  MagicLinkAuthenticationInput,
  VerifyMagicLinkInput,
} from './dto/magic-link-authentication.input';
import { Authentication } from './entities/authentication.entity';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => ApiCommonActionOutput)
  async sendMagicLink(
    @Args('payload')
    payload: MagicLinkAuthenticationInput,
  ) {
    await this.authService.sendMagicLink(payload);
    return { isSuccess: true, message: 'Magic link sent to your email.' };
  }

  // @Mutation(() => ApiCommonActionOutput)
  // async verifyMagicLink(@Args('payload') payload: VerifyMagicLinkInput) {
  //   const authUser = await this.authService.verifyToken(
  //     payload?.token,
  //     TokenTypes.MAGIC_LINK_TOKEN,
  //   );
  //   if (authUser) {
  //     const token = await this.authService.generateRefreshToken({
  //       email: authUser?.email,
  //       role: USER_ROLE.ADMIN,
  //     });

  //     return {
  //       isSuccess: true,
  //       data: { token },
  //       message: 'Your login successful.',
  //     };
  //   }
  //   throw new ForbiddenException('Access denied!');
  // }
}
