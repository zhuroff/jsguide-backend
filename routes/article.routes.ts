import { Router } from 'express'
import controller from '../controllers/article.controller'

const router = Router()

router.post('/', controller.headings)
router.get('/:id', controller.article)

export default router
