import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ScheduleModule.forRoot(),
    ApiModule,
    SlackModule,
  ],
  providers: [],
})
export class AppModule {}
