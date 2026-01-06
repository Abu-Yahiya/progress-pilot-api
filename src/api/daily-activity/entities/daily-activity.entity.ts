import { Field, ObjectType } from '@nestjs/graphql';

import { Paginated } from '@/src/shared/object-types/paginationObject';
import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { User } from '../../user/entities/user.entity';

// ---------------- Main Schema ----------------
export type DailyActivityDocument = DailyActivity & Document;

@ObjectType()
export class ExerciseInput {
  @Prop() @Field(() => Number, { nullable: true }) pushUp?: number;
  @Prop() @Field(() => Number, { nullable: true }) squats?: number;
  @Prop() @Field(() => Number, { nullable: true }) seatUp?: number;
  @Prop() @Field(() => Number, { nullable: true }) running?: number;
  @Prop() @Field(() => Number, { nullable: true }) jumpingJack?: number;
  @Prop() @Field(() => Number, { nullable: true }) plank?: number;
  @Prop() @Field(() => Number, { nullable: true }) dumbbleCurl?: number;
  @Prop() @Field(() => String, { nullable: true }) others?: string;
}

@ObjectType()
export class EbadahInput {
  @Prop() @Field(() => Number, { nullable: true }) namajWithJamath?: number;
  @Prop() @Field(() => Number, { nullable: true }) extraNamaj?: number;
  @Prop() @Field(() => Boolean, { nullable: true }) ishraq?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) tahajjud?: boolean;
  @Prop() @Field(() => String, { nullable: true }) tilwat?: string;
  @Prop() @Field(() => Number, { nullable: true }) hadith?: number;
  @Prop() @Field(() => String, { nullable: true }) readingBook?: string;
  @Prop() @Field(() => Boolean, { nullable: true }) waqiyah?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) mulk?: boolean;
  @Prop() @Field(() => String, { nullable: true }) translation?: string;
}
@ObjectType()
export class JikirInput {
  @Prop() @Field(() => Number, { nullable: true }) istigfar?: number;
  @Prop() @Field(() => Number, { nullable: true }) durudYunus?: number;
  @Prop() @Field(() => Number, { nullable: true }) durud?: number;
  @Prop() @Field(() => Number, { nullable: true }) doaTawhid?: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class DailyActivity {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  orgUID: string;

  @Prop({ type: MongooseTypes.ObjectId, ref: User.name, required: false })
  @Field(() => User, { nullable: true })
  user?: string;

  @Prop()
  @Field(() => EbadahInput, { nullable: true })
  ebadah?: EbadahInput;

  @Prop()
  @Field(() => JikirInput, { nullable: true })
  jikirAjkar?: JikirInput;

  @Prop()
  @Field(() => ExerciseInput, { nullable: true })
  exercise?: ExerciseInput;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const DailyActivitySchema = SchemaFactory.createForClass(DailyActivity);

// ---------------- Pagination ----------------
@ObjectType()
export class DailyActivityPagination extends Paginated(DailyActivity) {}
