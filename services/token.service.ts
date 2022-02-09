import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { Token } from '../models/token.model'
import { IUserDTO } from '~/dtos/user.dto'

class TokenService {
  generateTokens(payload: IUserDTO) {
    const accessToken = jwt.sign(
      payload,
      process.env['JWT_SECRET_TOKEN'] as string,
      { expiresIn: '90m' }
    )

    const refreshToken = jwt.sign(
      payload,
      process.env['JWT_REFRESH_TOKEN'] as string,
      { expiresIn: '30d' }
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userID: Types.ObjectId, refreshToken: string) {
    const dbToken = await Token.findOne({ user: userID })

    if (dbToken) {
      dbToken.refreshToken = refreshToken
      return dbToken.save()
    }

    const token = await Token.create({ user: userID, refreshToken })

    return token
  }
}

export default new TokenService()
