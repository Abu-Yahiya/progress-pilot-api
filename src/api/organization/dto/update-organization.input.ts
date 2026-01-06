import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { CreateOrganizationInput } from './create-organization.input';

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput,
) {}

@InputType()
export class InviteMemberToOrganizationInput {
  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  orgId: string;
}

@InputType()
export class VerifyInviteMemberToOrganizationInput {
  @Field(() => String)
  @IsString()
  token: string;
}
