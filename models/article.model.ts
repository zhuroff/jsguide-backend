import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { ArticleModel, IArticle } from '~/types/Article'

const ArticleSchema: Schema<ArticleModel> = new Schema({
  title: {
    type: String,
    required: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  article: {
    type: String,
    required: true
  },

  links: [
    {
      title: {
        type: String,
        required: true
      },

      url: {
        type: String,
        required: true
      }
    }
  ]
})

ArticleSchema.index({ title: 'text' })
ArticleSchema.plugin(mongoosePaginate)

export const Article = model<ArticleModel>('articles', ArticleSchema) as IArticle<ArticleModel>
