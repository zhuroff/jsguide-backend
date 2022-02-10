import 'module-alias/register'
import { Response } from 'express'
import { ApiError } from "~/exceptions/api-errors"
import tokenService from '~/services/token.service'

export const MiddlewareAuth = (req: any, res: Response, next: (error?: unknown) => void) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken =  authHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
