import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyActivityResolver } from './daily-activity.resolver';
import { DailyActivityService } from './daily-activity.service';
import {
  DailyActivity,
  DailyActivitySchema,
} from './entities/daily-activity.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyActivity.name, schema: DailyActivitySchema },
    ]),
  ],
  providers: [DailyActivityResolver, DailyActivityService],
})
export class DailyActivityModule {}
