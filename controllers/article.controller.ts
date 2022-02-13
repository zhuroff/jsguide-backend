import 'module-alias/register'
import { Request, Response } from 'express'
import { ApiError } from '~/exceptions/api-errors'
import articleService from '~/services/article.service'

export class ArticleController {
  static async headings(req: Request, res: Response, next: (error: unknown) => void) {
    const { page, limit, sort } = req.body

    try {
      const headings = await articleService.articles({ page, limit, sort, select: { title: true } })
      return res.json(headings)
    } catch (error) {
      next(error)
    }
  }

  static async article(req: Request, res: Response, next: (error: unknown) => void) {
    if (!req.params['id']) {
      return next(ApiError.BadRequest('Не указан id запроса'))
    }

    try {
      const article = await articleService.article(req.params['id'])
      return res.json(article)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: (error: unknown) => void) {
    if (!req.params['id']) {
      return next(ApiError.BadRequest('Не указан id запроса'))
    }

    const { title, article, links } = req.body
    const query = { _id: req.params['id'] }

    try {
      await articleService.update(query, { title, article, links })
      res.json({ message: 'Изменения сохранены' })
    } catch (error) {
      next(error)
    }
  }
}
