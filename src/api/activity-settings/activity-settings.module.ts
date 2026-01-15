import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySettingsResolver } from './activity-settings.resolver';
import { ActivitySettingsService } from './activity-settings.service';
import {
  ActivitySettings,
  ActivitySettingsSchema,
} from './entities/activity-settings.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivitySettings.name, schema: ActivitySettingsSchema },
    ]),
  ],
  providers: [ActivitySettingsResolver, ActivitySettingsService],
})
export class ActivitySettingsModule {}
