import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Paginated } from '@/src/shared/object-types/paginationObject';
import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { User } from '../../user/entities/user.entity';

// ---------------- Main Schema ----------------
export type DailyActivityDocument = DailyActivity & Document;

export enum Task_Status {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

registerEnumType(Task_Status, {
  name: 'Task_Status',
});

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
export class TilwatTranslationInput {
  @Prop() @Field(() => Number, { nullable: true }) count: number;
  @Prop() @Field(() => String, { nullable: true }) type: string;
  @Prop() @Field(() => String, { nullable: true }) description: string;
}

@ObjectType()
export class EbadahInput {
  @Prop() @Field(() => Number, { nullable: true }) namajWithJamath?: number;
  @Prop() @Field(() => Number, { nullable: true }) extraNamaj?: number;
  @Prop() @Field(() => Boolean, { nullable: true }) ishraq?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) tahajjud?: boolean;
  @Prop() @Field(() => Number, { nullable: true }) hadith?: number;
  @Prop() @Field(() => Boolean, { nullable: true }) waqiyah?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) kahf?: boolean;
  @Prop() @Field(() => Boolean, { nullable: true }) mulk?: boolean;

  @Prop()
  @Field(() => TilwatTranslationInput, { nullable: true })
  tilwat?: TilwatTranslationInput;

  @Prop()
  @Field(() => TilwatTranslationInput, { nullable: true })
  readingBook?: TilwatTranslationInput;

  @Prop()
  @Field(() => TilwatTranslationInput, { nullable: true })
  translation?: TilwatTranslationInput;

  @Prop()
  @Field(() => TilwatTranslationInput, { nullable: true })
  tafsir?: TilwatTranslationInput;
}
@ObjectType()
export class JikirInput {
  @Prop() @Field(() => Number, { nullable: true }) istigfar?: number;
  @Prop() @Field(() => Number, { nullable: true }) durudYunus?: number;
  @Prop() @Field(() => Number, { nullable: true }) durud?: number;
  @Prop() @Field(() => Number, { nullable: true }) doaTawhid?: number;
}

@ObjectType()
export class ITTaskInput {
  @Prop() @Field(() => String) title: string;
  @Prop() @Field(() => String, { nullable: true }) description?: string;

  @Prop()
  @Field(() => Number, { defaultValue: 0, nullable: true })
  progressScore: number;

  @Prop()
  @Field(() => Task_Status, {
    defaultValue: Task_Status.Pending,
    nullable: true,
  })
  status?: Task_Status;
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

  @Prop()
  @Field(() => [ITTaskInput], { nullable: true })
  it_task?: ITTaskInput[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const DailyActivitySchema = SchemaFactory.createForClass(DailyActivity);

// ---------------- Pagination ----------------
@ObjectType()
export class DailyActivityPagination extends Paginated(DailyActivity) {}
