import { PrismaService } from 'nestjs-prisma';
import { Subscription } from '@prisma/client';

export class SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany();
  }

  async updateSubscriptionQueryDate(
    subscriptionId: number,
    lastQueryDate: Date = new Date(),
  ): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        lastQueriedAt: lastQueryDate,
      },
    });
  }
}
