import { Document, Types } from 'mongoose'
import { IUser, UserModel } from '~/models/user.model'

export interface IUserDTO {
  login: string
  id: Types.ObjectId
}

export class UserDTO implements IUserDTO {
  public login
  public id

  constructor(model: Document<unknown, any, UserModel> & IUser) {
    this.login = model.login
    this.id = model._id
  }
}