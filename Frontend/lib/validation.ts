import { z } from 'zod'

// Base validation schemas
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1, 'Email is required')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name must not exceed 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens and apostrophes')

// User validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

// Types
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

// Validation functions
export const validateLogin = (data: unknown): LoginInput => {
  return loginSchema.parse(data)
}

export const validateRegister = (data: unknown): RegisterInput => {
  return registerSchema.parse(data)
}

// Error handling
export class ValidationError extends Error {
  constructor(public errors: z.ZodError) {
    super('Validation failed')
    this.name = 'ValidationError'
  }

  getFormattedErrors(): { [key: string]: string } {
    return this.errors.issues.reduce((acc, issue) => {
      const path = issue.path.join('.')
      acc[path] = issue.message
      return acc
    }, {} as { [key: string]: string })
  }
}

// Validation wrapper
export const validate = async <T>(
  schema: z.ZodSchema,
  data: unknown
): Promise<T> => {
  try {
    return schema.parse(data) as T
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error)
    }
    throw error
  }
}

// Helper functions
export const isValidEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

export const isValidPassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password)
    return true
  } catch {
    return false
  }
}

export const isValidName = (name: string): boolean => {
  try {
    nameSchema.parse(name)
    return true
  } catch {
    return false
  }
} 