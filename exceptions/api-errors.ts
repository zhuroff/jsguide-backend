export type ApiErrorProps = {
  status: number
  errors: string[]
}

export class ApiError extends Error implements ApiErrorProps {
  status: number
  message: string
  errors: any

  constructor(
    status: number,
    message: string,
    errors: string[] = []
  ) {
    super(message)
    
    this.status = status
    this.errors = errors
    this.message = message
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message: string, errors?: string[]) {
    return new ApiError(400, message, errors)
  }
}
