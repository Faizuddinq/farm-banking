"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { User } from "@/types/user"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  users: User[]
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserStatus: (userId: string, isActive: boolean) => Promise<boolean>
  updateUserProfile: (name: string, email: string) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])

  // Initialize with demo users if localStorage is empty
  useEffect(() => {
    const storedUsers = localStorage.getItem("users")
    if (!storedUsers) {
      const initialUsers: User[] = [
        {
          id: uuidv4(),
          name: "Test User",
          email: "test@bank.com",
          password: "123456",
          role: "user",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          name: "Admin User",
          email: "admin@bank.com",
          password: "admin123",
          role: "admin",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("users", JSON.stringify(initialUsers))
      setUsers(initialUsers)
    } else {
      setUsers(JSON.parse(storedUsers))
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find((u) => u.email === email && u.password === password && u.isActive)

        if (foundUser) {
          setUser(foundUser)
          setIsAuthenticated(true)

          if (rememberMe) {
            localStorage.setItem("currentUser", JSON.stringify(foundUser))
          }

          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const emailExists = users.some((u) => u.email === email)

        if (emailExists) {
          resolve(false)
          return
        }

        const newUser: User = {
          id: uuidv4(),
          name,
          email,
          password,
          role: "user",
          isActive: true,
          createdAt: new Date().toISOString(),
        }

        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)
        localStorage.setItem("users", JSON.stringify(updatedUsers))

        setUser(newUser)
        setIsAuthenticated(true)
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        resolve(true)
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  const updateUserStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUsers = users.map((u) => (u.id === userId ? { ...u, isActive } : u))

        setUsers(updatedUsers)
        localStorage.setItem("users", JSON.stringify(updatedUsers))

        resolve(true)
      }, 500)
    })
  }

  const updateUserProfile = async (name: string, email: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false)
          return
        }

        // Check if email is already taken by another user
        const emailTaken = users.some((u) => u.id !== user.id && u.email === email)
        if (emailTaken) {
          resolve(false)
          return
        }

        const updatedUser = { ...user, name, email }
        const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))

        setUser(updatedUser)
        setUsers(updatedUsers)
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        resolve(true)
      }, 500)
    })
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false)
          return
        }

        // Verify current password
        if (user.password !== currentPassword) {
          resolve(false)
          return
        }

        const updatedUser = { ...user, password: newPassword }
        const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))

        setUser(updatedUser)
        setUsers(updatedUsers)
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        resolve(true)
      }, 500)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        users,
        login,
        register,
        logout,
        updateUserStatus,
        updateUserProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
