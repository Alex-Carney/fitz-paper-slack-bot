import { Module } from '@nestjs/common';
import { SchedulerProvider } from './scheduler.provider';
import { SlackService } from './slack.service';

@Module({
  imports: [],
  providers: [SchedulerProvider, SlackService],
  exports: [SchedulerProvider, SlackService],
})
export class SlackModule {}
