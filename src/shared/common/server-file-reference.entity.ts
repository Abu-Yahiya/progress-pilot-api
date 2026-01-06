import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class ServerFileEntity {
  @Prop()
  @Field(() => String, { nullable: true })
  bucket?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  region?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  key?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  externalUrl?: string;
}

@InputType()
export class ServerFileInput {
  @Field(() => String, { nullable: true })
  bucket?: string;

  @Field(() => String, { nullable: true })
  region?: string;

  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => String, { nullable: true })
  externalUrl?: string;
}
