import { Document, Types } from 'mongoose'
import { IUser, UserModel } from '~/models/user.model'

export interface IUserDTO {
  login: string
  id: Types.ObjectId
  isAdmin: boolean
}

export class UserDTO implements IUserDTO {
  public login
  public id
  public isAdmin

  constructor(model: Document<unknown, any, UserModel> & IUser) {
    this.login = model.login
    this.id = model._id
    this.isAdmin = model.isAdmin
  }
}