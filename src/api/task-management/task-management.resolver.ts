import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskManagementInput } from './dto/create-task-management.input';
import { TaskListQueryDto } from './dto/task-list-query.input';
import { UpdateTaskManagementInput } from './dto/update-task-management.input';
import {
  TaskManagement,
  TaskManagementPagination,
} from './entities/task-management.entity';
import { TaskManagementService } from './task-management.service';

@Resolver(() => TaskManagement)
export class TaskManagementResolver {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Mutation(() => TaskManagement)
  createTask(
    @Args('input')
    input: CreateTaskManagementInput,
  ) {
    return this.taskManagementService.create(input);
  }

  @Query(() => TaskManagementPagination, { name: 'taskList' })
  findAll(
    @Args('input', { nullable: true }) input: TaskListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.taskManagementService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => TaskManagement, { name: 'task' })
  findOne(@Args('input') input: CommonMatchInput, @Info() info: any) {
    try {
      const fields = getGqlFields(info);
      const find = mongodbFindObjectBuilder(input);
      return this.taskManagementService.findOne(find, fields);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Boolean)
  async updateTask(
    @Args('input')
    input: UpdateTaskManagementInput,
  ) {
    try {
      await this.taskManagementService.update(input._id, input);
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  //
  async removeTask(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.taskManagementService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  // @Query(() => RevinewByEmployee, {
  //   name: 'taskRevinew',
  // })
  // async taskRevinewCalculationTask(
  //   @Args('employeeIds', { type: () => [String], nullable: true })
  //   employeeIds?: string[],
  // ) {
  //   try {
  //     return await this.taskManagementService.taskRevinewCalculation(
  //       employeeIds || null,
  //     );
  //   } catch (error) {
  //     throw new ForbiddenException(error.message);
  //   }
  // }
}
