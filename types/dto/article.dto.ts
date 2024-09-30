import { BasePagingDto, BasePagingResponse } from './base.dto'

export interface CreateArticleDto {
  title: string;
  content: string;
  backgroundUrl: string | undefined;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  backgroundUrl: string | undefined;
  createdAt: string;
}

export interface FindArticleDto extends BasePagingDto {
}

export interface FindArticleResponse extends BasePagingResponse<Article> {}

export interface UpdateArticleDto extends CreateArticleDto {
  id: number;
}

export interface DeleteArticleDto {
  id: number;
}