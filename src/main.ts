import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ArxivQueryService } from './services/arxiv-query.service';
import { parseStringPromise } from 'xml2js';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: new ConsoleLogger(),
  });

  const arxivService = app.get(ArxivQueryService);
  const query = 'quantum computing';

  console.log(`Searching arXiv for "${query}"...\n`);

  try {
    const response = await arxivService.searchPapers(
      ['Fitzpatrick Mattias,Viola Lorenza'],
      [query],
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      new Date(),
    );
    const parsed = await parseStringPromise(response);

    const entries = parsed.feed.entry || [];
    entries.forEach((entry, idx) => {
      console.log(`${idx + 1}. ${entry.title[0].trim()}`);
      console.log(`   Authors: ${entry.author.map((a) => a.name).join(', ')}`);
      console.log(`   Published: ${entry.published[0]}`);
      console.log(`   Link: ${entry.id[0]}\n`);
    });

    if (entries.length === 0) {
      console.log('No papers found.');
    }
  } catch (error) {
    console.error('Failed to fetch or parse arXiv data:', error);
  }

  await app.close();
}
bootstrap();
