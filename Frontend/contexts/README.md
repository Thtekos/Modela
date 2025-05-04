# Authentication Context

This directory contains React context providers for managing application state. The main context is the Authentication context which handles user authentication.

## Auth Context (`auth-context.tsx`)

The Authentication context provides user authentication state and methods throughout the application.

### Features

- User authentication state management
- Login functionality
- Registration functionality
- Logout functionality
- Persistent authentication using localStorage and cookies
- Input validation for email, password, and user name
- Error handling with custom AuthError class

### Usage

```tsx
// Wrap your app with the provider
import { AuthProvider } from '@/contexts/auth-context'

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  )
}

// Use the auth context in components
import { useAuth } from '@/contexts/auth-context'

function YourComponent() {
  const { user, isLoading, isAuthenticated, login, register, logout } = useAuth()
  
  // Use the auth methods and state
  return (
    // Your component JSX
  )
}
```

### API

#### Types

```tsx
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "user"
  company?: string
  jobTitle?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}
```

#### Methods

- `login(email: string, password: string)`: Authenticates a user
- `register(name: string, email: string, password: string)`: Creates a new user account
- `logout()`: Logs out the current user

#### Properties

- `user`: The current user object or null if not authenticated
- `isLoading`: Boolean indicating if an auth operation is in progress
- `isAuthenticated`: Boolean indicating if a user is currently authenticated

### Validation

The context includes validation for:
- Email format
- Password length (minimum 8 characters)
- Name length (2-50 characters)

### Error Handling

Custom `AuthError` class for authentication-specific errors. Errors are thrown for:
- Invalid input validation
- Invalid stored user data
- Unexpected errors during authentication operations 