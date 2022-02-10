import 'module-alias/register'
import { Request, Response } from 'express'
import { ApiError, ApiErrorProps } from '~/exceptions/api-errors'

export const MiddlewareErrors = (error: ApiErrorProps, req: Request, res: Response, next: (error: unknown) => void) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      errors: error.errors
    })
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
