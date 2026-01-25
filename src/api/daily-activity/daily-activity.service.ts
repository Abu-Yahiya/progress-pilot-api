import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityListQueryDto } from './dto/activity-list-dto';
import {
  CreateDailyActivityDto,
  ITTaskInputDto,
} from './dto/create-daily-activity.input';
import { UpdateDailyActivityInputDto } from './dto/update-daily-activity.input';
import {
  DailyActivity,
  DailyActivityDocument,
  Task_Status,
} from './entities/daily-activity.entity';

@Injectable()
export class DailyActivityService {
  constructor(
    @InjectModel(DailyActivity.name)
    private activityModel: Model<DailyActivityDocument>,
  ) {}
  create(payload: CreateDailyActivityDto) {
    let itTasks = [];

    payload?.it_task?.map((task) =>
      itTasks?.push({
        ...task,
        status: this.getStatus(task),
      }),
    );

    const input = { ...payload, it_task: itTasks };

    return this.activityModel.create(input);
  }

  getStatus(task: ITTaskInputDto) {
    if (task?.progressScore === 0) {
      return Task_Status.Pending;
    } else if (task?.progressScore > 0 && task?.progressScore < 100) {
      return Task_Status.InProgress;
    } else if (task?.progressScore === 100) {
      return Task_Status.Completed;
    } else {
      return Task_Status.Cancelled;
    }
  }

  async findAll(
    input: ActivityListQueryDto,
    orgUID: string,
    userId: string,
    fields: string[] | string,
  ) {
    const { page = 1, limit = 10 } = input;
    const where: any = filterBuilder(input.where, input.whereOperator);

    // filter
    where.$and.push({ orgUID, user: userId });
    // where.$and.push({ userId });

    const cursor = this.activityModel.find(where);

    // if (fields.includes('items.product')) {
    //   cursor.populate({
    //     path: 'items.product',
    //     model: Product.name,
    //   });
    // }

    const count = await this.activityModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    return new AppPaginationResponse(data, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * get single product details
   * @param _id - string
   * @param orgUID - string
   * @param fields - string[]
   * @returns
   */
  async findOne(_id: string, orgUID: string, userId: string, fields: string[]) {
    const cursor = this.activityModel.findOne({ _id, orgUID, user: userId });

    const data = await cursor;
    return data;
  }

  async update(
    _id: string,
    orgUID: string,
    userId: string,
    payload: UpdateDailyActivityInputDto,
  ) {
    let itTasks = [];

    payload?.it_task?.map((task) =>
      itTasks?.push({
        ...task,
        status: this.getStatus(task),
      }),
    );

    const input = { ...payload, it_task: itTasks };
    return this.activityModel.updateOne({ _id, orgUID, user: userId }, input);
  }

  remove(_id: string) {
    return this.activityModel.deleteOne({ _id });
  }
}
