import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateUser(slackToken: string, slackName: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        slackId: slackToken,
      },
    });

    if (user) {
      return user;
    }

    return this.prisma.user.create({
      data: {
        slackId: slackToken,
        slackName: slackName,
      },
    });
  }
}
