import { JwtStrategy } from '@/src/app/config/jwtStrategy';
import { MailService } from '@/src/shared/mail-service/mail.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';
import {
  Organization,
  OrganizationSchema,
} from './entities/organization.entity';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    UserModule,
    AuthenticationModule,
  ],
  providers: [
    OrganizationResolver,
    OrganizationService,
    MailService,
    JwtStrategy,
  ],
})
export class OrganizationModule {}
