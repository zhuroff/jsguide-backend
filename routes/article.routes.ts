import { Router } from 'express'
import controller from '../controllers/article.controller'
import { MiddlewareAuth } from '~/middleware/middleware.auth'

const router = Router()

router.post('/', controller.headings)
router.get('/:id', controller.article)
router.patch('/:id', MiddlewareAuth, controller.update)

export default router
