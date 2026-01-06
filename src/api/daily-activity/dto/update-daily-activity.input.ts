import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateDailyActivityDto } from './create-daily-activity.input';

@InputType()
export class UpdateDailyActivityInputDto extends PartialType(
  CreateDailyActivityDto,
) {
  @Field(() => ID)
  _id: string;
}
