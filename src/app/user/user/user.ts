import { Role } from "src/app/auth/auth.enum";

export interface IUser {
  id: string
  email: string
  role: Role
  created: Date | string
  paidThrough: Date | string
  emailVerified: boolean
}

export class User implements IUser {
  constructor(
    public id = '',
    public email = '',
    public role = Role.None,
    public created: Date | string = '',
    public paidThrough: Date | string = '',
    public emailVerified = false,
    ){

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

    return new User(user.id, user.email, user.role, user.created, user.paidThrough, user.emailVerified)
  }

  toJSON(): object {
    const serialized = Object.assign(this)
    delete serialized.id
    return serialized
  }
}
