import { UsersOnSubscriptions, UserSubscriptionRole } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export class UserSubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSubscriptionsByUser(
    slackId: string,
  ): Promise<UsersOnSubscriptions[]> {
    // Get all subscriptions for a user from the through table UsersOnSubscriptions
    return this.prisma.usersOnSubscriptions.findMany({
      where: {
        slackId,
      },
    });
  }

  async getAllUsersBySubscription(
    subscriptionId: number,
  ): Promise<UsersOnSubscriptions[]> {
    return this.prisma.usersOnSubscriptions.findMany({
      where: {
        subscriptionId,
      },
    });
  }

  async connectUserToSubscription(
    slackId: string,
    subscriptionId: number,
  ): Promise<UsersOnSubscriptions> {
    return this.prisma.usersOnSubscriptions.create({
      data: {
        slackId,
        subscriptionId,
        role: UserSubscriptionRole.MEMBER,
      },
    });
  }

  async disconnectUserFromSubscription(
    slackId: string,
    subscriptionId: number,
  ): Promise<UsersOnSubscriptions> {
    return this.prisma.usersOnSubscriptions.delete({
      where: {
        subscriptionId_slackId: {
          slackId,
          subscriptionId,
        },
      },
    });
  }
}
