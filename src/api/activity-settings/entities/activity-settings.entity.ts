import { Field, ObjectType } from '@nestjs/graphql';

import { Paginated } from '@/src/shared/object-types/paginationObject';
import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { User } from '../../user/entities/user.entity';

// ---------------- Main Schema ----------------
export type ActivitySettingsDocument = ActivitySettings & Document;

@ObjectType()
export class ExerciseTargetInput {
  @Prop() @Field(() => Number, { nullable: true }) pushUp?: number;
  @Prop() @Field(() => Number, { nullable: true }) squats?: number;
  @Prop() @Field(() => Number, { nullable: true }) seatUp?: number;
  @Prop() @Field(() => Number, { nullable: true }) running?: number;
  @Prop() @Field(() => Number, { nullable: true }) jumpingJack?: number;
  @Prop() @Field(() => Number, { nullable: true }) plank?: number;
  @Prop() @Field(() => Number, { nullable: true }) dumbbleCurl?: number;
}

@ObjectType()
export class TilwatTranslationTargetInput {
  @Prop() @Field(() => Number, { nullable: true }) count: number;
  @Prop() @Field(() => String, { nullable: true }) type: string;
  @Prop() @Field(() => String, { nullable: true }) description: string;
}

@ObjectType()
export class EbadahTargetInput {
  @Prop() @Field(() => Number, { nullable: true }) namajWithJamath?: number;
  @Prop() @Field(() => Number, { nullable: true }) extraNamaj?: number;

  @Prop()
  @Field(() => TilwatTranslationTargetInput, { nullable: true })
  tilwat?: TilwatTranslationTargetInput;

  @Prop()
  @Field(() => TilwatTranslationTargetInput, { nullable: true })
  readingBook?: TilwatTranslationTargetInput;

  @Prop()
  @Field(() => TilwatTranslationTargetInput, { nullable: true })
  tafsir?: TilwatTranslationTargetInput;

  @Prop()
  @Field(() => TilwatTranslationTargetInput, { nullable: true })
  translation?: TilwatTranslationTargetInput;

  @Prop() @Field(() => Number, { nullable: true }) hadith?: number;
}
@ObjectType()
export class JikirTargetInput {
  @Prop() @Field(() => Number, { nullable: true }) istigfar?: number;
  @Prop() @Field(() => Number, { nullable: true }) durudYunus?: number;
  @Prop() @Field(() => Number, { nullable: true }) durud?: number;
  @Prop() @Field(() => Number, { nullable: true }) doaTawhid?: number;
  @Prop() @Field(() => Boolean, { nullable: true }) ishraq?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) tahajjud?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) waqiyah?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) mulk?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) kahf?: boolean;
}

@ObjectType()
@Schema({ timestamps: true })
export class ActivitySettings {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop()
  @Field(() => String)
  orgUID: string;

  @Prop({ type: MongooseTypes.ObjectId, ref: User.name, required: false })
  @Field(() => User, { nullable: true })
  user?: string;

  @Prop()
  @Field(() => EbadahTargetInput, { nullable: true })
  ebadahTarget?: EbadahTargetInput;

  @Prop()
  @Field(() => JikirTargetInput, { nullable: true })
  jikirAjkarTarget?: JikirTargetInput;

  @Prop()
  @Field(() => ExerciseTargetInput, { nullable: true })
  exerciseTarget?: ExerciseTargetInput;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const ActivitySettingsSchema =
  SchemaFactory.createForClass(ActivitySettings);

// ---------------- Pagination ----------------
@ObjectType()
export class ActivitySettingsPagination extends Paginated(ActivitySettings) {}
