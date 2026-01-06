import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsOptional()
  @MinLength(6)
  password: string;
}
