import 'module-alias/register'
import { Article } from '~/models/article.model'
import { ArticleLinks } from '~/types/Article'

type ArticlesProps = {
  page: number
  limit:number
  sort: { [index: string]: number }
  select: { [index: string]: true }
}

type ArticleProps = {
  title: string
  article: string
  links: ArticleLinks[]
}

class ArticleService {
  async articles({ page, limit, sort, select }: ArticlesProps) {
    const dbArticles = await Article.paginate({}, { page, limit, sort, select })
    return dbArticles
  }

  async article(id: string) {
    const dbArticle = await Article.findById(id)
    return dbArticle
  }

  async update(query: { _id: string }, $set: ArticleProps) {
    await Article.findOneAndUpdate(query, $set, { new: true })
  }
}

export default new ArticleService()
