import { JwtStrategy } from '@/src/app/config/jwtStrategy';
import { MailService } from '@/src/shared/mail-service/mail.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UserModule],
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    MailService,
    JwtStrategy,
  ],

  exports: [AuthenticationService],
})
export class AuthenticationModule {}
