import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class MagicLinkAuthenticationInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}

@InputType()
export class VerifyMagicLinkInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
