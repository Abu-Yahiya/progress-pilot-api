import { ServerFileInput } from '@/src/shared/common/server-file-reference.entity';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ORG_STATUS } from '../entities/organization.entity';

@InputType()
class OrganizationSettingsInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  apiKey: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  apiToken: string;
}

@InputType()
class MetaSetupDataInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  pixelId: string;
}

@InputType()
class SocialLinksInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  facebook: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  x: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  instagram: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  youtube: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  daraz: string;
}

@InputType()
export class CreateOrganizationInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: String;

  @Field(() => String, { nullable: true })
  @IsOptional()
  tagline: String;

  @Field(() => String, { nullable: true })
  @IsOptional()
  orgUID?: string;

  @Field(() => String)
  @IsNotEmpty()
  businessEmail: String;

  @Field(() => String)
  @IsNotEmpty()
  businessPhone: String;

  @Field(() => String)
  @IsNotEmpty()
  address: String;

  @Field(() => ServerFileInput, { nullable: true })
  @IsOptional()
  cover?: ServerFileInput;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true }) // ✅ apply to each item in array
  employees: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isVerified: boolean;

  @Field(() => ORG_STATUS, { nullable: true })
  @IsOptional()
  status: ORG_STATUS;

  @Field(() => OrganizationSettingsInput, { nullable: true })
  @IsOptional()
  settings: OrganizationSettingsInput;

  @Field(() => SocialLinksInput, { nullable: true })
  @IsOptional()
  socialLinks: SocialLinksInput;

  @Field(() => MetaSetupDataInput, { nullable: true })
  @IsOptional()
  metaSetupData: MetaSetupDataInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  owner: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
