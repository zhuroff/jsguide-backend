import 'module-alias/register'
import { Request, Response } from 'express'
import { ApiError } from '~/exceptions/api-errors'
import articleService from '~/services/article.service'

export class ArticleController {
  static async headings(req: Request, res: Response, next: (error: unknown) => void) {
    const { isDraft, page, limit, sort } = req.body
    const select = { title: true, children: true, parent: true } as const

    try {
      const headings = await articleService.articles({ isDraft, page, limit, sort, select })
      return res.json(headings)
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: (error: unknown) => void) {
    const { id } = req.body
    
    try {
      const article = await articleService.create({ id })
      return res.json(article)
    } catch (error) {
      console.log(error)
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

    const { title, article, isDraft, links } = req.body
    const query = { _id: req.params['id'] }

    try {
      await articleService.update(query, { title, article, isDraft, links })
      res.json({ message: 'Изменения сохранены' })
    } catch (error) {
      next(error)
    }
  }

  static async remove(req: Request, res: Response, next: (error: unknown) => void) {
    if (!req.params['id']) {
      return next(ApiError.BadRequest('Не указан id запроса'))
    }
    
    try {
      await articleService.remove(req.params['id'])
      res.json({ message: 'Статья удалена' })
    } catch (error) {
      next(error)
    }
  }
}
