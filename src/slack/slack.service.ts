import { Injectable, Logger } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private slackClient: WebClient;
  private readonly channelToken: string;

  constructor() {
    // Retrieve the tokens from your environment variables
    const botToken = process.env.SLACK_BOT_TOKEN;
    this.channelToken = process.env.SLACK_CHANNEL_TOKEN;

    if (!botToken) {
      throw new Error('Missing SLACK_BOT_TOKEN in environment');
    }

    // Create a new Slack client with the bot token
    this.slackClient = new WebClient(botToken);
  }

  async sendMessage(text: string) {
    try {
      await this.slackClient.chat.postMessage({
        channel: this.channelToken,
        text,
      });
      this.logger.log(`Message sent to channel ${this.channelToken}`);
    } catch (error) {
      this.logger.error(`Failed to send message: ${error}`);
    }
  }
}
