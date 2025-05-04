import { z } from 'zod'
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  loginSchema,
  registerSchema,
  validateLogin,
  validateRegister,
  ValidationError,
  validate,
  isValidEmail,
  isValidPassword,
  isValidName,
} from '../validation'

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('validates correct email format', () => {
      expect(() => emailSchema.parse('test@example.com')).not.toThrow()
    })

    it('rejects invalid email format', () => {
      expect(() => emailSchema.parse('invalid-email')).toThrow()
    })

    it('rejects empty email', () => {
      expect(() => emailSchema.parse('')).toThrow('Email is required')
    })
  })

  describe('passwordSchema', () => {
    it('validates correct password format', () => {
      expect(() => passwordSchema.parse('Test123!@')).not.toThrow()
    })

    it('rejects password without uppercase', () => {
      expect(() => passwordSchema.parse('test123!@')).toThrow('Password must contain at least one uppercase letter')
    })

    it('rejects password without lowercase', () => {
      expect(() => passwordSchema.parse('TEST123!@')).toThrow('Password must contain at least one lowercase letter')
    })

    it('rejects password without number', () => {
      expect(() => passwordSchema.parse('TestTest!@')).toThrow('Password must contain at least one number')
    })

    it('rejects password without special character', () => {
      expect(() => passwordSchema.parse('Test1234')).toThrow('Password must contain at least one special character')
    })

    it('rejects short password', () => {
      expect(() => passwordSchema.parse('Test1!')).toThrow('Password must be at least 8 characters long')
    })
  })

  describe('nameSchema', () => {
    it('validates correct name format', () => {
      expect(() => nameSchema.parse('John Doe')).not.toThrow()
    })

    it('validates name with hyphen', () => {
      expect(() => nameSchema.parse('Jean-Pierre')).not.toThrow()
    })

    it('validates name with apostrophe', () => {
      expect(() => nameSchema.parse("O'Connor")).not.toThrow()
    })

    it('rejects name with numbers', () => {
      expect(() => nameSchema.parse('John123')).toThrow()
    })

    it('rejects name with special characters', () => {
      expect(() => nameSchema.parse('John@Doe')).toThrow()
    })

    it('rejects too short name', () => {
      expect(() => nameSchema.parse('J')).toThrow('Name must be at least 2 characters long')
    })

    it('rejects too long name', () => {
      const longName = 'a'.repeat(51)
      expect(() => nameSchema.parse(longName)).toThrow('Name must not exceed 50 characters')
    })
  })
})

describe('Validation Functions', () => {
  describe('validateLogin', () => {
    it('validates correct login data', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Test123!@',
      }
      expect(() => validateLogin(loginData)).not.toThrow()
    })

    it('rejects invalid login data', () => {
      const loginData = {
        email: 'invalid-email',
        password: 'short',
      }
      expect(() => validateLogin(loginData)).toThrow()
    })
  })

  describe('validateRegister', () => {
    it('validates correct registration data', () => {
      const registerData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Test123!@',
      }
      expect(() => validateRegister(registerData)).not.toThrow()
    })

    it('rejects invalid registration data', () => {
      const registerData = {
        name: 'J',
        email: 'invalid-email',
        password: 'short',
      }
      expect(() => validateRegister(registerData)).toThrow()
    })
  })

  describe('ValidationError', () => {
    it('formats errors correctly', () => {
      const zodError = new z.ZodError([{
        code: z.ZodIssueCode.invalid_string,
        message: 'Invalid email',
        path: ['email'],
        validation: 'email'
      }])
      const error = new ValidationError(zodError)
      expect(error.getFormattedErrors()).toEqual({
        email: 'Invalid email',
      })
    })
  })

  describe('validate', () => {
    it('validates data with schema', async () => {
      const data = { email: 'test@example.com' }
      const result = await validate(z.object({ email: emailSchema }), data)
      expect(result).toEqual(data)
    })

    it('throws ValidationError for invalid data', async () => {
      const data = { email: 'invalid-email' }
      await expect(validate(z.object({ email: emailSchema }), data)).rejects.toThrow(ValidationError)
    })

    it('passes through other errors', async () => {
      const error = new Error('Test error')
      const failingSchema = z.custom(() => {
        throw error
      })
      await expect(validate(failingSchema, {})).rejects.toThrow(error)
    })
  })

  describe('Helper Functions', () => {
    describe('isValidEmail', () => {
      it('returns true for valid email', () => {
        expect(isValidEmail('test@example.com')).toBe(true)
      })

      it('returns false for invalid email', () => {
        expect(isValidEmail('invalid-email')).toBe(false)
      })
    })

    describe('isValidPassword', () => {
      it('returns true for valid password', () => {
        expect(isValidPassword('Test123!@')).toBe(true)
      })

      it('returns false for invalid password', () => {
        expect(isValidPassword('weak')).toBe(false)
      })
    })

    describe('isValidName', () => {
      it('returns true for valid name', () => {
        expect(isValidName('John Doe')).toBe(true)
      })

      it('returns false for invalid name', () => {
        expect(isValidName('J')).toBe(false)
      })
    })
  })
}) 