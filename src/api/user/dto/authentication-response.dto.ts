import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class AuthenticationResponseInput {
  @Field(() => String)
  @Prop()
  @IsNotEmpty()
  isSuccess: boolean;

  @Field(() => String)
  @Prop()
  @IsNotEmpty()
  message: string;

  @Field(() => String)
  @Prop()
  @IsNotEmpty()
  token: string;
}
