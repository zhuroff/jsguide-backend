import 'module-alias/register'
import { Request, Response } from 'express'
import userService from '~/services/user.service'

export class UserController {
  static async registration(req: Request, res: Response, next: any) {
    try {
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

      res.status(201).json({ message: 'Вы успешно зарегистрировались' })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async login(req: Request, res: Response, next: any) {
    try {
      
    } catch (error) {
      
    }
  }

  static async logout(req: Request, res: Response, next: any) {
    try {
      
    } catch (error) {
      
    }
  }
}
