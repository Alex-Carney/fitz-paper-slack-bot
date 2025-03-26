import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { SlackModule } from './slack/slack.module';
import { ArxivModule } from "./arxiv/arxiv.module";

@Module({
  imports: [
    PrismaModule.forRoot(),
    ScheduleModule.forRoot(),
    ApiModule,
    SlackModule,
    ArxivModule,
  ],
  providers: [],
})
export class AppModule {}
