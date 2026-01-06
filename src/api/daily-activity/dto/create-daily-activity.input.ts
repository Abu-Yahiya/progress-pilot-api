import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

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
export class EbadahInputDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  namajWithJamath?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  extraNamaj?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  ishraq?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  tahajjud?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  tilwat?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  hadith?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readingBook?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  waqiyah?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  mulk?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  translation?: string;
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
