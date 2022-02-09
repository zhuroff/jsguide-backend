import bcrypt from 'bcrypt'
import tokenService from './token.service'
import { User } from '../models/user.model'
import { UserDTO } from '~/dtos/user.dto'

class UserService {
  async registration(login: string, password: string) {
    try {
      const candidate = await User.findOne({ login })

      if (candidate) {
        throw new Error('Пользователь с таким логином уже существует')
      }

      const hashPassword = await bcrypt.hash(password, 3)
      const user = await User.create({ login, password: hashPassword })
      const userDTO = new UserDTO(user)
      const tokens = tokenService.generateTokens({ ...userDTO })
      
      await tokenService.saveToken(userDTO.id, tokens.refreshToken)

      return { ...tokens, user: userDTO }
    } catch (error) {
      
    }
  }
}

export default new UserService()
