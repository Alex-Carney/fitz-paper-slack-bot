import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArxivQueryService } from './services/arxiv-query.service';
import { UserRepository } from './repositories/user.repository';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { UserSubscriptionRepository } from './repositories/user-subscription.repository';

@Module({
  imports: [HttpModule],
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
