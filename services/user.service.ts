import bcrypt from 'bcrypt'
import tokenService from './token.service'
import { User } from '../models/user.model'
import { UserDTO } from '~/dtos/user.dto'
import { ApiError } from '~/exceptions/api-errors'

class UserService {
  async registration(login: string, password: string) {
    const candidate = await User.findOne({ login })

    if (candidate) {
      throw ApiError.BadRequest('Пользователь с таким логином уже существует')
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await User.create({ login, password: hashPassword })
    const userDTO = new UserDTO(user)
    const tokens = tokenService.generateTokens({ ...userDTO })
    
    await tokenService.saveToken(userDTO.id, tokens.refreshToken)

    return { ...tokens, user: userDTO }
  }

  async login(login: string, password: string) {
    const dbUser = await User.findOne({ login })

    if (!dbUser) {
      throw ApiError.BadRequest('Пользователя с указанной парой логин/пароль не существует')
    }

    const isPasswordsEquals = await bcrypt.compare(password, dbUser.password)

    if (!isPasswordsEquals) {
      throw ApiError.BadRequest('Пользователя с указанной парой логин/пароль не существует')
    }

    const userDTO = new UserDTO(dbUser)
    const tokens = tokenService.generateTokens({ ...userDTO })

    await tokenService.saveToken(userDTO.id, tokens.refreshToken)

    return { ...tokens, user: userDTO }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
}

export default new UserService()
