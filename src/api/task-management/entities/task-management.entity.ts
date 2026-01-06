import { Paginated } from '@/src/shared/object-types/paginationObject';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type TaskManagementDocument = TaskManagement & Document;

export enum Task_Progress_Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN-PROGRESS',
  WORK_DONE = 'WORK-DONE',
  REVISION = 'REVISION',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(Task_Progress_Status, {
  name: 'Task_Progress_Status',
});

export enum Payment_Status {
  REFUNDED = 'REFUNDED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  DUE = 'DUE',
  CANCELLED = 'CANCELLED',
}

registerEnumType(Payment_Status, {
  name: 'Payment_Status',
});

@ObjectType()
export class ServerFileReference {
  @Prop()
  @Field(() => String)
  fileUrl: string;
}

@ObjectType()
export class TaskManagement_TaskDetails {
  @Prop()
  @Field(() => String)
  taskName: string;

  @Prop()
  @Field(() => String, { nullable: true })
  taskDescription: string;

  @Prop()
  @Field(() => String, { nullable: true })
  issuesDescription: string;
}

@Schema({ timestamps: true })
@ObjectType()
export class TaskManagement {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  taskCreatedBy: string;

  @Prop()
  @Field(() => TaskManagement_TaskDetails)
  taskDetails: TaskManagement_TaskDetails;

  @Prop()
  @Field(() => String)
  taskId: string;

  @Prop()
  @Field(() => [ServerFileReference], { nullable: true })
  files: [ServerFileReference];

  @Prop()
  @Field(() => Int)
  totalBillAmount: number;

  @Prop()
  @Field(() => Int)
  paidBillAmount: number;

  @Prop()
  @Field(() => Int)
  dueAmount: number;

  @Prop({ default: Task_Progress_Status.PENDING })
  @Field(() => Task_Progress_Status, {
    defaultValue: Task_Progress_Status.PENDING,
    nullable: true,
  })
  progressStatus: Task_Progress_Status;

  @Prop({ default: Payment_Status.DUE })
  @Field(() => Payment_Status, {
    defaultValue: Payment_Status.DUE,
  })
  paymentStatus: Payment_Status;

  @Prop()
  @Field(() => Date)
  deadLine: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const TaskManagementSchema =
  SchemaFactory.createForClass(TaskManagement);

@ObjectType()
export class TaskManagementPagination extends Paginated(TaskManagement) {}
