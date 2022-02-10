import { Router } from 'express'
import { UserController } from '~/controllers/user.controller'
import { body } from 'express-validator'

const router = Router()

router.post(
  '/registration',
  body('login').isLength({ min: 3, max: 30 }),
  body('password').isLength({ min: 8, max: 30 }),
  UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

export default router
