import { SubscriptionRepository } from './repositories/subscription.repository';
import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserSubscriptionRepository } from './repositories/user-subscription.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('api')
export class ApiController {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
  ) {}

  @Post('user')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userRepository.getOrCreateUser(
      createUserDTO.slackToken,
      createUserDTO.username,
    );
  }
}
