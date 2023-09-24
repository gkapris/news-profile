import { Article } from './article';

export interface NewsFeedResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
