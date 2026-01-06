import { ServerFileEntity } from '@/src/shared/common/server-file-reference.entity';
import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrganizationDocument = Organization & Document;

export enum ORG_STATUS {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  InActive = 'INACTIVE',
  Disable = 'DISABLE',
}

registerEnumType(ORG_STATUS, {
  name: 'Organization_Status',
});

@ObjectType()
class OrganizationSettingsSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  apiKey: string;

  @Prop()
  @Field(() => String, { nullable: true })
  apiToken: string;
}

@ObjectType()
class MetaSetupDataSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  pixelId: string;
}

@ObjectType()
class SocialLinksSchema {
  @Prop()
  @Field(() => String, { nullable: true })
  facebook: string;

  @Prop()
  @Field(() => String, { nullable: true })
  x: string;

  @Prop()
  @Field(() => String, { nullable: true })
  instagram: string;

  @Prop()
  @Field(() => String, { nullable: true })
  youtube: string;

  @Prop()
  @Field(() => String, { nullable: true })
  daraz: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Organization {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  name: String;

  @Prop()
  @Field(() => String, { nullable: true })
  tagline: String;

  @Prop()
  @Field(() => String, { nullable: true })
  orgUID?: string;

  @Prop({ default: false })
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;

  @Prop({ default: ORG_STATUS.Pending })
  @Field(() => ORG_STATUS, { nullable: true })
  status: ORG_STATUS;

  @Prop({ unique: true })
  @Field(() => String)
  businessEmail: String;

  @Prop()
  @Field(() => String)
  businessPhone: String;

  @Prop()
  @Field(() => String)
  address: String;

  @Prop()
  @Field(() => ServerFileEntity, { nullable: true })
  cover?: ServerFileEntity;

  @Prop()
  @Field(() => ServerFileEntity, { nullable: true })
  Logo?: ServerFileEntity;

  // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'employee' })
  // @Field(() => [Employee], { nullable: true })
  // employees: string[];

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'employee' })
  // @Field(() => Employee, { nullable: true })
  // owner: string;

  @Prop()
  @Field(() => OrganizationSettingsSchema, { nullable: true })
  settings?: OrganizationSettingsSchema;

  @Prop()
  @Field(() => SocialLinksSchema, { nullable: true })
  socialLinks?: SocialLinksSchema;

  @Prop()
  @Field(() => MetaSetupDataSchema, { nullable: true })
  metaSetupData?: MetaSetupDataSchema;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

@ObjectType()
export class OrganizationWithPagination extends Paginated(Organization) {}
