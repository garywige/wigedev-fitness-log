import { Role } from "src/app/common/services/auth/auth.enum"
import { User } from "./user"

describe('User', () => {
  let instance: User

  beforeEach(() => {
    instance = new User('test', 'test', Role.None)
  })

  it('should be created', () => {
    expect(instance).toBeTruthy()
  })

  describe('Build()', () => {
    it('should create an object with identical properties', () => {
      const copy = User.Build(instance)
      let same = true
      if(instance.id !== copy.id ||
        instance.email !== copy.email ||
        instance.role !== copy.role ||
        instance.created !== copy.created ||
        instance.paidThrough !== copy.paidThrough ||
        instance.emailVerified !== copy.emailVerified){

        same = false
      }

      expect(same).toEqual(true)
    })
  })

  describe('toJSON()', () => {
    it('should return an identical object that is missing the id property', () => {
      const copy = instance.toJSON() as User
      let same = true
      let hasId = false
      if(
        instance.email !== copy.email ||
        instance.role !== copy.role ||
        instance.created !== copy.created ||
        instance.paidThrough !== copy.paidThrough ||
        instance.emailVerified !== copy.emailVerified){

        same = false
      }

      if(copy?.id){
        hasId = true
      }

      expect(same && !hasId).toEqual(true)
    })
  })
})
