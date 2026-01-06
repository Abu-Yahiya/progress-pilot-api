import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class ApiCommonActionOutput {
  @Field(() => Boolean, { nullable: true })
  isSuccess: boolean;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: any;
}
