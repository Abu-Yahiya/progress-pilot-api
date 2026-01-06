import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import { MailService } from '@/src/shared/mail-service/mail.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MagicLinkAuthenticationInput } from './dto/magic-link-authentication.input';

@Injectable()
export class AuthenticationService {
  constructor(
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}
  /**
   * generate token link
   * @param email string
   * @returns
   */
  generateToken(email: string): string {
    const token = this.jwtService.sign({
      email,
      type: TokenTypes.MAGIC_LINK_TOKEN,
    });

    // return `${process.env.APP_URL}/auth/verify-link?token=${token}`;
    return token;
  }

  /**
   * send magic link
   * @param payload - string
   */
  async sendMagicLink(payload: MagicLinkAuthenticationInput): Promise<void> {
    // create magic link
    const token = this.generateToken(payload?.email);
    const magicLink = `${process.env.APP_URL}/auth/verify-login?token=${token}`;

    const mailContentPayload = `<h2>Click <a style="color:blue;" href="${magicLink}">here</a> to log in!</h2>`;

    // send mail to user email with magicLink
    return this.mailService.sendMail(payload?.email, mailContentPayload);
  }

  /**
   * generate refresh token
   * @param payload user
   * @returns string
   */
  async generateRefreshToken(payload): Promise<string> {
    return this.jwtService.sign(
      { ...payload, type: TokenTypes.REFRESH_TOKEN },
      {
        secret: process.env.JWT_SECRET || 'refreshSecret',
        expiresIn: process.env.JWT_REFRESH_EXPIRES, // refresh token valid for 7 days
      },
    );
  }

  /**
   * Verify magic link
   * @param token string
   * @returns
   */
  async verifyToken(token: string, type: string) {
    try {
      const res = await this.jwtService.verify(token);

      if (res.type !== type) {
        throw new UnauthorizedException('Invalid token');
      }
      return res;
    } catch {
      return null;
    }
  }
}
