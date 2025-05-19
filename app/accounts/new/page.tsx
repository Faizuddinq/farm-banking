"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useBanking } from "@/lib/banking-context"
import Navbar from "@/components/navbar"

export default function NewAccountPage() {
  const { isAuthenticated, user } = useAuth()
  const { createAccount } = useBanking()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState<"checking" | "savings" | "investment">("checking")
  const [initialDeposit, setInitialDeposit] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const deposit = Number.parseFloat(initialDeposit)

    if (!initialDeposit || deposit <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid initial deposit amount greater than zero.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      await createAccount(accountType, deposit)

      toast({
        title: "Account created successfully",
        description: `Your new ${accountType} account has been created with an initial deposit of $${deposit.toFixed(2)}.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Account creation failed",
        description: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 p-4 pt-6 md:p-8 md:pt-10">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Open New Account</h1>
        </div>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <CardTitle>New Account</CardTitle>
            </div>
            <CardDescription>Choose the type of account you want to open and make an initial deposit.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="new-account-form" className="space-y-6">
              <div className="space-y-3">
                <Label>Account Type</Label>
                <RadioGroup
                  value={accountType}
                  onValueChange={(value) => setAccountType(value as any)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="checking" id="checking" />
                    <Label htmlFor="checking" className="flex flex-1 cursor-pointer items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium">Checking Account</p>
                        <p className="text-xs text-muted-foreground">
                          Everyday transactions with unlimited withdrawals
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="savings" id="savings" />
                    <Label htmlFor="savings" className="flex flex-1 cursor-pointer items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium">Savings Account</p>
                        <p className="text-xs text-muted-foreground">Higher interest rates with limited withdrawals</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="investment" id="investment" />
                    <Label htmlFor="investment" className="flex flex-1 cursor-pointer items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium">Investment Account</p>
                        <p className="text-xs text-muted-foreground">Long-term growth with market-based returns</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialDeposit">Initial Deposit</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-sm text-muted-foreground">$</span>
                  </div>
                  <Input
                    id="initialDeposit"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    step="0.01"
                    min="0.01"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum initial deposit: 100</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" form="new-account-form" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Open Account"
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By opening an account, you agree to our{" "}
              <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
