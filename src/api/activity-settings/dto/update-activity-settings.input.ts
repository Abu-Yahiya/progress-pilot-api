import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateActivitySettingsDto } from './create-activity-settings.input';

@InputType()
export class UpdateActivitySettingsInputDto extends PartialType(
  CreateActivitySettingsDto,
) {
  @Field(() => ID)
  _id: string;
}
