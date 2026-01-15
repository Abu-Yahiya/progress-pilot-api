import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActivitySettingsService } from './activity-settings.service';
import { ActivitySettingsListQueryDto } from './dto/activity-settings-list-dto';
import { CreateActivitySettingsDto } from './dto/create-activity-settings.input';
import { UpdateActivitySettingsInputDto } from './dto/update-activity-settings.input';
import {
  ActivitySettings,
  ActivitySettingsPagination,
} from './entities/activity-settings.entity';

@Resolver(() => ActivitySettings)
export class ActivitySettingsResolver {
  constructor(
    private readonly activitySettingService: ActivitySettingsService,
  ) {}

  @Mutation(() => ActivitySettings)
  // @UseGuards(GqlAuthGuard)
  async createActivitySettings(
    @Args('payload') payload: CreateActivitySettingsDto,
  ) {
    try {
      return this.activitySettingService.create(payload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Query(() => ActivitySettingsPagination, { name: 'allActivitySettings' })
  // @UseGuards(GqlAuthGuard)
  findAll(
    @Args('input', { nullable: true }) input: ActivitySettingsListQueryDto,
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.activitySettingService.findAll(input, orgUID, userId, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => ActivitySettings, { name: 'myActivitySetting' })
  // @UseGuards(GqlAuthGuard)
  findOne(
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
    @Info() info: any,
  ) {
    const fields = getGqlFields(info);
    return this.activitySettingService.findOne(orgUID, userId, fields);
  }

  @Mutation(() => Boolean)
  // @UseGuards(GqlAuthGuard)
  async updateActivitySetting(
    @Args('payload') payload: UpdateActivitySettingsInputDto,
    @Args('orgUID', { type: () => String }) orgUID: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    await this.activitySettingService.update(
      payload._id,
      orgUID,
      userId,
      payload,
    );
    return true;
  }

  @Mutation(() => ActivitySettings)
  // @UseGuards(GqlAuthGuard)
  removeActivitySetting(@Args('_id', { type: () => String }) _id: string) {
    return this.activitySettingService.remove(_id);
  }
}
