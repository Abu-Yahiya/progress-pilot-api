import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ExerciseTargetInputDto {
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
export class EbadahTargetInputDto {
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

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  tilwat?: TilwatTranslationInputDto;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  readingBook?: TilwatTranslationInputDto;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  tafsir?: TilwatTranslationInputDto;

  @Field(() => TilwatTranslationInputDto, { nullable: true })
  @IsOptional()
  translation?: TilwatTranslationInputDto;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  hadith?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  waqiyah?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  mulk?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  khaf?: boolean;
}

@InputType()
export class JikirTargetInputDto {
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
export class CreateActivitySettingsDto {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  orgUID: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  user?: string;

  @Field(() => EbadahTargetInputDto, { nullable: true })
  @IsOptional()
  ebadahTarget?: EbadahTargetInputDto;

  @Field(() => JikirTargetInputDto, { nullable: true })
  @IsOptional()
  jikirAjkarTarget?: JikirTargetInputDto;

  @Field(() => ExerciseTargetInputDto, { nullable: true })
  @IsOptional()
  exerciseTarget?: ExerciseTargetInputDto;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
