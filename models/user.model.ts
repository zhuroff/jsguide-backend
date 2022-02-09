import { model, Schema, Types } from 'mongoose'

export interface UserModel {
  login: string
  password: string
}

export interface IUser extends UserModel {
  _id: Types.ObjectId
}

const UserSchema: Schema<UserModel> = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

export const User = model<UserModel>('users', UserSchema)
