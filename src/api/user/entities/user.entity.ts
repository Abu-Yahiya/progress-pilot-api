import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  LEARNER = 'LEARNER',
}

registerEnumType(USER_ROLE, {
  name: 'USER_ROLE',
});

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  name: string;

  @Prop({ required: true })
  @Field(() => String)
  email: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  phone: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  password: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  avatar: string;

  @Prop({ default: USER_ROLE.LEARNER })
  @Field(() => USER_ROLE, { defaultValue: USER_ROLE.LEARNER })
  role: USER_ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserPagination extends Paginated(User) {}
