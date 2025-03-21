import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArxivQueryService } from './services/arxiv-query.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [HttpModule, PrismaModule.forRoot()],
  providers: [ArxivQueryService],
})
export class AppModule {}
