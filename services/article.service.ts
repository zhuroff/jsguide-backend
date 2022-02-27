import 'module-alias/register'
import { Article } from '~/models/article.model'
import { ArticleLinks } from '~/types/Article'

type ArticlesProps = {
  isDraft: boolean
  page: number
  limit:number
  sort: { [index: string]: number }
  select: { [index: string]: true }
}

type ArticleProps = {
  title: string
  article: string
  isDraft: boolean
  links: ArticleLinks[]
}

class ArticleService {
  async articles({ isDraft, page, limit, sort, select }: ArticlesProps) {
    const dbArticles = await Article.paginate({ isDraft }, { page, limit, sort, select })
    return dbArticles
  }

  async create({ id }: { id: string | null }) {
    const article = new Article({
      title: 'Заголовок статьи...',
      article: 'Текст статьи...',
      parent: id
    })
    const dbArticle = await article.save()

    if (id) {
      await Article.findOneAndUpdate(
        { _id: id },
        { $push: { children: article._id } },
        { new: true }
      )
    }

    return dbArticle
  }

  async article(id: string) {
    return await Article.findById(id)
      .populate({ path: 'children', select: ['title'] })
  }

  async update(query: { _id: string }, $set: ArticleProps) {
    await Article.findOneAndUpdate(query, $set, { new: true })
  }

  async remove(_id: string) {
    await Article.deleteOne({ _id })
  }
}

export default new ArticleService()
