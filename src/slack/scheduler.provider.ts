import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SlackService } from './slack.service';

@Injectable()
export class SchedulerProvider {
  private readonly logger = new Logger(SchedulerProvider.name);

  constructor(private readonly slackService: SlackService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendScheduledUpdate() {
    this.logger.log('Sending scheduled update...');
    await this.slackService.sendMessage('This is your scheduled update!');
  }
}
