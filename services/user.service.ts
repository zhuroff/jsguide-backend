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
}

export default new UserService()
