import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskManagementInput } from './create-task-management.input';

@InputType()
export class UpdateTaskManagementInput extends PartialType(
  CreateTaskManagementInput,
) {
  @Field(() => String)
  _id: string;
}
