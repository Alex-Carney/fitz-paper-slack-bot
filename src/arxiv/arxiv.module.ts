// arxiv.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axiosRetry from 'axios-retry';
import { ArxivQueryService } from './arxiv-query.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ArxivQueryService],
  exports: [ArxivQueryService],
})
export class ArxivModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    axiosRetry(this.httpService.axiosRef, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay,
      shouldResetTimeout: true,
      // Retry on HTTP 429 or if the error code is ECONNABORTED
      retryCondition: (error) =>
        error?.response?.status === 429 || error.code === 'ECONNABORTED',
      onRetry: (retryCount, error, requestConfig) => {
        console.log(`Retrying request attempt ${retryCount}`);
      },
    });
  }
}
