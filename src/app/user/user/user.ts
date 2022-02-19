import { Role } from "src/app/auth/auth.enum";
import { PassThrough } from "stream";

export interface IUser {
  id: string
  email: string
  created: Date | string
  paidThrough: Date | string
  emailVerified: boolean
}

export class User implements IUser {
  constructor(
    public id = '',
    public email = '',
    public created: Date | string = '',
    public paidThrough: Date | string = '',
    public emailVerified = false){

  }

  get role() {
    return User.DetermineRole(this)
  }

  static Build(user: IUser){
    if(!user){
      return new User()
    }

    if(typeof user.created === 'string'){
      user.created = new Date(user.created)
    }

    if(typeof user.paidThrough === 'string'){
      user.paidThrough = new Date(user.paidThrough)
    }

    return new User(user.id, user.email, user.created, user.paidThrough, user.emailVerified)
  }

  static DetermineRole(user: IUser){
    let expireDate: Date = typeof user.paidThrough === 'string' ? new Date(user.paidThrough) : user.paidThrough
    let today = new Date()
    return today < expireDate ? Role.Pro : user.emailVerified ? Role.Free : Role.None
  }

  toJSON(): object {
    const serialized = Object.assign(this)
    delete serialized.id
    return serialized
  }
}
