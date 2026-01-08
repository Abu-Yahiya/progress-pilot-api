import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DailyActivityService } from './daily-activity.service';
import { ActivityListQueryDto } from './dto/activity-list-dto';
import { CreateDailyActivityDto } from './dto/create-daily-activity.input';
import { UpdateDailyActivityInputDto } from './dto/update-daily-activity.input';
import {
  DailyActivity,
  DailyActivityPagination,
} from './entities/daily-activity.entity';

@Resolver(() => DailyActivity)
export class DailyActivityResolver {
  constructor(private readonly activityService: DailyActivityService) {}

  @Mutation(() => DailyActivity)
  // @UseGuards(GqlAuthGuard)
  async createActivity(@Args('payload') payload: CreateDailyActivityDto) {
    try {
      return this.activityService.create(payload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Query(() => DailyActivityPagination, { name: 'activitiesByOrgAndUser' })
  // @UseGuards(GqlAuthGuard)
  findAll(
    @Args('input', { nullable: true }) input: ActivityListQueryDto,
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.activityService.findAll(input, orgUID, userId, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => DailyActivity, { name: 'activityByOrgAndUser' })
  // @UseGuards(GqlAuthGuard)
  findOne(
    @Args('_id', { type: () => String }) _id: string,
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
    @Info() info: any,
  ) {
    const fields = getGqlFields(info);
    return this.activityService.findOne(_id, orgUID, userId, fields);
  }

  @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard)
  async updateActivity(
    @Args('payload') payload: UpdateDailyActivityInputDto,
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    await this.activityService.update(payload._id, orgUID, userId, payload);
    return true;
  }

  @Mutation(() => DailyActivity)
  // @UseGuards(GqlAuthGuard)
  removeActivity(@Args('_id', { type: () => String }) _id: string) {
    return this.activityService.remove(_id);
  }
}
