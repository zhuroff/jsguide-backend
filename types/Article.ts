import { Document, PaginateModel } from 'mongoose'

interface ArticleLinks {
  title: string
  url: string
}

interface ArticleModel extends Document {
  title: string
  dateCreated: Date,
  article: string
  links: ArticleLinks[]
}

interface IArticle<T extends Document> extends PaginateModel<T> {}

export {
  ArticleModel,
  IArticle
}
