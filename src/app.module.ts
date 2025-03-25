import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PrismaModule.forRoot(), ScheduleModule.forRoot(), ApiModule],
  providers: [],
})
export class AppModule {}
