import { Role } from "src/app/auth/auth.enum";

export interface IUser {
  id: string
  email: string
  password: string
  created: Date | string
  paidThrough: Date | string
  emailVerified: boolean
}
