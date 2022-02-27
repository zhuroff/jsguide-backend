import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { ArticleModel, IArticle } from '~/types/Article'

const ArticleSchema: Schema<ArticleModel> = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  article: {
    type: String,
    required: true
  },

  isDraft: {
    type: Boolean,
    required: false,
    default: true
  },

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'articles',
    required: false
  },

  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'articles',
      required: false
    }
  ],

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
