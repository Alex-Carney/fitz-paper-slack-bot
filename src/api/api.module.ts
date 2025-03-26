import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArxivQueryService } from '../arxiv/arxiv-query.service';
import { UserRepository } from './repositories/user.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { UserSubscriptionRepository } from './repositories/user-subscription.repository';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  providers: [
    ArxivQueryService,
    UserRepository,
    SubscriptionRepository,
    UserSubscriptionRepository,
  ],
  exports: [
    ArxivQueryService,
    UserRepository,
    SubscriptionRepository,
    UserSubscriptionRepository,
  ],
})
export class ApiModule {}
