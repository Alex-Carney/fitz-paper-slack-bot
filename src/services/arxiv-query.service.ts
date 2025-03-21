import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ArxivQueryService {
  private readonly logger = new Logger(ArxivQueryService.name);
  private readonly AND = '+AND+';
  private readonly OR = '+OR+';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Searches for arXiv papers matching given authors, keywords, and a date range.
   *
   * @param authors Array of author names (e.g., ['Preskill John'])
   * @param tags Array of keywords/tags (e.g., ['quantum computing'])
   * @param fromDate Start date (inclusive)
   * @param toDate End date (inclusive)
   * @param max_results
   * @returns Raw XML response from arXiv
   */
  async searchPapers(
    authors: string[],
    tags: string[],
    fromDate: Date,
    toDate: Date = new Date(),
    max_results = 10,
  ): Promise<string> {
    const queries: string[] = [];

    if (authors.length > 0) {
      queries.push(this.createAuthorQueryFromString(authors.join(',')));
    }
    if (tags.length > 0) {
      queries.push(this.createKeywordQueryFromString(tags.join(',')));
    }

    // Separate the date query from other queries
    const dateQuery =
      fromDate && toDate ? this.createDateRangeQuery(fromDate, toDate) : null;

    // Combine everything except for the date with OR. Then, add the date with AND
    let finalQuery = '';
    if (queries.length > 0 && dateQuery) {
      finalQuery = `(${queries.join(this.OR)})${this.AND}${dateQuery}`;
    } else if (queries.length > 0) {
      finalQuery = queries.join(this.OR);
    } else if (dateQuery) {
      finalQuery = dateQuery;
    }

    const baseUrl = 'http://export.arxiv.org/api/query';
    const queryString = `search_query=${finalQuery}&max_results=${max_results}`;
    const url = `${baseUrl}?${queryString}`;

    this.logger.log(`Querying arXiv with URL: ${url}`);

    const response = await lastValueFrom(
      this.httpService.get(url, { responseType: 'text' }),
    );
    this.logger.log(`Received ${response.data.length} bytes of data.`);
    return response.data;
  }

  /**
   * Creates a date range query string for arXiv.
   *
   * arXiv expects dates formatted as:
   * submittedDate:[YYYYMMDDHHmm+TO+YYYYMMDDHHmm]
   */
  private createDateRangeQuery(fromDate: Date, toDate: Date): string {
    const pad = (n: number): string => n.toString().padStart(2, '0');
    const formatDate = (date: Date): string => {
      const year = date.getUTCFullYear();
      const month = pad(date.getUTCMonth() + 1);
      const day = pad(date.getUTCDate());
      const hours = pad(date.getUTCHours());
      const minutes = pad(date.getUTCMinutes());
      return `${year}${month}${day}${hours}${minutes}`;
    };
    return `submittedDate:[${formatDate(fromDate)}+TO+${formatDate(toDate)}]`;
  }

  /**
   * Creates an author query string.
   *
   * Example:
   *   Input: "John Preskill, Jane Doe"
   *   Output: "au:John_Preskill+OR+au:Jane_Doe"
   */
  private createAuthorQueryFromString(authorString: string): string {
    const authorNames = authorString.split(',').map((name) => name.trim());
    const formattedAuthors = authorNames
      .filter((name) => name.length > 0)
      .map((name) => 'au:' + name.split(/\s+/).join('_'));
    return formattedAuthors.join(this.OR);
  }

  /**
   * Creates a keyword query string.
   *
   * Example:
   *   Input: "quantum computing,exceptional points"
   *   Output: "all:quantum computing+OR+all:exceptional points"
   */
  private createKeywordQueryFromString(keywordString: string): string {
    const keywords = keywordString.split(',').map((kw) => kw.trim());
    const formattedKeywords = keywords
      .filter((kw) => kw.length > 0)
      .map((kw) => `all:${kw}`);
    return formattedKeywords.join(this.OR);
  }
}
