import { Router } from 'express'
import { ArticleController } from '~/controllers/article.controller'
import { MiddlewareAuth } from '~/middleware/middleware.auth'

const router = Router()

router.post('/', ArticleController.headings)
router.get('/:id', ArticleController.article)
router.post('/create', MiddlewareAuth, ArticleController.create)
router.patch('/:id', MiddlewareAuth, ArticleController.update)
router.delete('/:id', ArticleController.remove)

export default router
