import { Document, PaginateModel, Types } from 'mongoose'

type ArticleLinks = {
  title: string
  url: string
}

interface ArticleModel extends Document {
  title: string
  dateCreated: Date
  article: string
  isDraft: boolean
  parent?: Types.ObjectId,
  children?: Types.ObjectId[]
  links: ArticleLinks[]
}

interface IArticle<T extends Document> extends PaginateModel<T> {}

export {
  ArticleLinks,
  ArticleModel,
  IArticle
}
