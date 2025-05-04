import { render, act, renderHook, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { useRouter } from 'next/navigation'
import { ValidationError } from '../../lib/validation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}))

describe('AuthContext', () => {
  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    // Clear localStorage and cookies before each test
    localStorage.clear()
    document.cookie = ''
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    // Reset router mock
    mockRouter.push.mockReset()
    // Reset window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000',
        search: '',
      },
      writable: true
    })
  })

  it('provides initial authentication state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBeFalsy()
    expect(result.current.isLoading).toBeFalsy()
  })

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')
  })

  describe('login', () => {
    it('validates email format', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await expect(result.current.login('invalid-email', 'password123')).rejects.toThrow('Invalid email format')
      })
    })

    it('validates password length', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await expect(result.current.login('test@example.com', 'short')).rejects.toThrow('Password must be at least 8 characters')
      })
    })

    it('validates password complexity', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      // Test missing uppercase
      await expect(result.current.login('test@example.com', 'password123!')).rejects.toThrow(/uppercase/)
      
      // Test missing lowercase
      await expect(result.current.login('test@example.com', 'PASSWORD123!')).rejects.toThrow(/lowercase/)
      
      // Test missing number
      await expect(result.current.login('test@example.com', 'Password!@#')).rejects.toThrow(/number/)
      
      // Test missing special character
      await expect(result.current.login('test@example.com', 'Password123')).rejects.toThrow(/special character/)
      
      // Test too short
      await expect(result.current.login('test@example.com', 'Pa1!')).rejects.toThrow(/8 characters/)
    })

    it('successfully logs in user with valid credentials', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(result.current.isAuthenticated).toBeTruthy()
      expect(result.current.user).toBeTruthy()
      expect(result.current.user?.email).toBe('test@example.com')
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })

    it('handles redirect after successful login', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/login?redirect=/settings',
          search: '?redirect=/settings'
        },
        writable: true
      })
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(mockRouter.push).toHaveBeenCalledWith('/settings')
    })

    it('ignores login/register redirects', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:3000/login?redirect=/login',
          search: '?redirect=/login'
        },
        writable: true
      })
      
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })

    it('sets secure cookie in production', async () => {
      const originalEnv = process.env.NODE_ENV
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(document.cookie).toContain('Secure')

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        configurable: true
      })
    })

    it('handles unexpected errors', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage error')
      })

      await act(async () => {
        await expect(result.current.login('test@example.com', 'Password123!')).rejects.toThrow('An unexpected error occurred during login')
      })

      localStorage.setItem = originalSetItem
    })
  })

  describe('register', () => {
    it('validates name format', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await expect(result.current.register('', 'test@example.com', 'password123')).rejects.toThrow('Name is required')
      })
    })

    it('validates email format', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await expect(result.current.register('Test User', 'invalid-email', 'password123')).rejects.toThrow('Invalid email format')
      })
    })

    it('validates password length', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await expect(result.current.register('Test User', 'test@example.com', 'short')).rejects.toThrow('Password must be at least 8 characters')
      })
    })

    it('validates password complexity', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      // Test missing uppercase
      await expect(result.current.register('Test User', 'test@example.com', 'password123!')).rejects.toThrow(/uppercase/)
      
      // Test missing lowercase
      await expect(result.current.register('Test User', 'test@example.com', 'PASSWORD123!')).rejects.toThrow(/lowercase/)
      
      // Test missing number
      await expect(result.current.register('Test User', 'test@example.com', 'Password!@#')).rejects.toThrow(/number/)
      
      // Test missing special character
      await expect(result.current.register('Test User', 'test@example.com', 'Password123')).rejects.toThrow(/special character/)
      
      // Test too short
      await expect(result.current.register('Test User', 'test@example.com', 'Pa1!')).rejects.toThrow(/8 characters/)
    })

    it('successfully registers user with valid data', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.register('Test User', 'test@example.com', 'Password123!')
      })

      expect(result.current.isAuthenticated).toBeTruthy()
      expect(result.current.user).toBeTruthy()
      expect(result.current.user?.name).toBe('Test User')
      expect(result.current.user?.email).toBe('test@example.com')
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })

    it('sets secure cookie in production', async () => {
      const originalEnv = process.env.NODE_ENV
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.register('Test User', 'test@example.com', 'Password123!')
      })

      expect(document.cookie).toContain('Secure')

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        configurable: true
      })
    })

    it('handles unexpected errors', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage error')
      })

      await act(async () => {
        await expect(result.current.register('Test User', 'test@example.com', 'Password123!')).rejects.toThrow('An unexpected error occurred during registration')
      })

      localStorage.setItem = originalSetItem
    })
  })

  describe('logout', () => {
    it('successfully logs out user', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      // First login
      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(result.current.isAuthenticated).toBeTruthy()

      // Then logout
      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBeFalsy()
      expect(result.current.user).toBeNull()
      expect(localStorage.getItem('modela_user')).toBeNull()
      expect(document.cookie).not.toContain('modela_auth_token')
      expect(mockRouter.push).toHaveBeenCalledWith('/')
    })
  })

  describe('persistence', () => {
    it('restores user session from localStorage', async () => {
      const mockUser = {
        id: 'test_id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      }

      localStorage.setItem('modela_user', JSON.stringify(mockUser))

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy()
      })

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBeTruthy()
    })

    it('handles invalid stored user data', async () => {
      const invalidUser = {
        name: 'Test User',
        email: 'test@example.com'
        // Missing required fields
      }

      localStorage.setItem('modela_user', JSON.stringify(invalidUser))

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy()
      })

      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBeFalsy()
      expect(localStorage.getItem('modela_user')).toBeNull()
    })

    it('handles invalid JSON in localStorage', async () => {
      localStorage.setItem('modela_user', 'invalid json')

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy()
      })

      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBeFalsy()
      expect(localStorage.getItem('modela_user')).toBeNull()
    })
  })

  describe('server-side rendering', () => {
    let originalWindow: any

    beforeEach(() => {
      originalWindow = global.window
      delete (global as any).window
      // Mock window.location for SSR
      global.window = {
        location: {
          href: 'http://localhost:3000',
          search: ''
        }
      } as any
    })

    afterEach(() => {
      global.window = originalWindow
    })

    it('handles login in SSR environment', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.login('test@example.com', 'Password123!')
      })

      expect(result.current.user?.id).toBe('user_static_id')
    })

    it('handles register in SSR environment', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

      await act(async () => {
        await result.current.register('Test User', 'test@example.com', 'Password123!')
      })

      expect(result.current.user?.id).toBe('user_static_id')
    })
  })
}) 