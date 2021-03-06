import 'module-alias/register'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '~/exceptions/api-errors'
import userService from '~/services/user.service'

export class UserController {
  static async registration(req: Request, res: Response, next: (error: unknown) => void) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
      }

      const { login, password } = req.body
      const userData = await userService.registration(login, password)
      
      res.cookie(
        'refreshToken',
        userData?.refreshToken,
        {
          maxAge: 30 * 24 + 60 * 60 * 1000,
          httpOnly: true ,
          secure: process.env['NODE_ENV'] === 'production'
        }
      )

      res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response, next: (error: unknown) => void) {
    try {
      const { login, password } = req.body
      const userData = await userService.login(login, password)

      res.cookie(
        'refreshToken',
        userData?.refreshToken,
        {
          maxAge: 30 * 24 + 60 * 60 * 1000,
          httpOnly: true ,
          secure: process.env['NODE_ENV'] === 'production'
        }
      )

      res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  static async logout(req: Request, res: Response, next: (error: unknown) => void) {
    try {
      const { refreshToken } = req.cookies
      const token = userService.logout(refreshToken)
      res.clearCookie('refreshToken')

      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  static async refresh(req: Request, res: Response, next: (error: unknown) => void) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)

      res.cookie(
        'refreshToken',
        userData?.refreshToken,
        {
          maxAge: 30 * 24 + 60 * 60 * 1000,
          httpOnly: true ,
          secure: process.env['NODE_ENV'] === 'production'
        }
      )

      res.json(userData)
    } catch (error) {
      next(error)
    }
  }
}
