"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <RegisterForm />
    </div>
  )
}
