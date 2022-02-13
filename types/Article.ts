import { Document, PaginateModel } from 'mongoose'

type ArticleLinks = {
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
  ArticleLinks,
  ArticleModel,
  IArticle
}
