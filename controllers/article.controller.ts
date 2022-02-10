import 'module-alias/register'
import { Request, Response } from 'express'
import { Article } from '../models/article.model'

const headings = async (req: Request, res: Response) => {
  const options = {
    page: req.body.page,
    limit: req.body.limit,
    sort: req.body.sort,
    select: { title: true }
  }

  try {
    const response = await Article.paginate({}, options)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const article = async (req: Request, res: Response) => {
  try {
    const response = await Article.findById(req.params['id'])
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req: Request, res: Response) => {
  try {
    res.json({ message: 'Fake update' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  headings,
  article,
  update
}

export default controller
