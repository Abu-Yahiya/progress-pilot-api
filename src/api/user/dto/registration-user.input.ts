import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { USER_ROLE } from '../entities/user.entity';

@InputType()
export class RegistrationUserInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name: string;

  @Field(() => String, { description: 'User email', nullable: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password: string;

  @Field(() => USER_ROLE, { description: 'User role', nullable: true })
  @IsOptional()
  role: USER_ROLE.LEARNER;

  @Field(() => String, { description: 'User avatar', nullable: true })
  @IsOptional()
  avatar: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}
