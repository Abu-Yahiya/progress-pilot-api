import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Task_Status } from '../entities/daily-activity.entity';

@InputType()
export class ExerciseInputDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  pushUp?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  squats?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  seatUp?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  running?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  jumpingJack?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  plank?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  dumbbleCurl?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  others?: string;
}

@InputType()
export class TilwatTranslationInputDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  count: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  type: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;
}

@InputType()
export class EbadahInputDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  namajWithJamath?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  kajaNamaj?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  extraNamaj?: number;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  tilwat?: TilwatTranslationInputDto;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  hadith?: number;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  readingBook?: TilwatTranslationInputDto;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  translation?: TilwatTranslationInputDto;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  tafsir?: TilwatTranslationInputDto;
}

@InputType()
export class JikirInputDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  istigfar?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  durudYunus?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  durud?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  doaTawhid?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  ishraq?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  tahajjud?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  waqiyah?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  mulk?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  kahf?: boolean;
}

@InputType()
export class ITTaskInputDto {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Number, { defaultValue: 0, nullable: true })
  @IsOptional()
  progressScore: number;

  @Field(() => Task_Status, {
    defaultValue: Task_Status.Pending,
    nullable: true,
  })
  @IsOptional()
  status?: Task_Status;
}

@InputType()
export class CreateDailyActivityDto {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  orgUID: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  user?: string;

  @Field(() => EbadahInputDto, { nullable: true })
  @IsOptional()
  ebadah?: EbadahInputDto;

  @Field(() => JikirInputDto, { nullable: true })
  @IsOptional()
  jikirAjkar?: JikirInputDto;

  @Field(() => ExerciseInputDto, { nullable: true })
  @IsOptional()
  exercise?: ExerciseInputDto;

  @Field(() => [ITTaskInputDto], { nullable: true })
  @IsOptional()
  @IsArray()
  it_task?: ITTaskInputDto[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
