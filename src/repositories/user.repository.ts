import { PrismaService } from 'nestjs-prisma';
import { User, UsersOnSubscriptions } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateUser(slackId: string, slackName: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        slackId,
      },
    });

    if (user) {
      return user;
    }

    return this.prisma.user.create({
      data: {
        slackId,
        slackName: slackName,
      },
    });
  }

  async getAllUserSubscriptions(
    slackId: string,
  ): Promise<UsersOnSubscriptions[]> {
    // Get all subscriptions for a user from the through table UsersOnSubscriptions
    return this.prisma.usersOnSubscriptions.findMany({
      where: {
        slackId,
      },
    });
  }
}
