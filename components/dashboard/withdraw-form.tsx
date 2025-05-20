"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useBanking } from "@/lib/banking-context"

export default function WithdrawForm() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { withdraw, activeAccount } = useBanking()
  const { toast } = useToast()

  // Add safety check for when activeAccount is undefined
  if (!activeAccount) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
          <CardDescription>Loading account information...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const withdrawAmount = Number.parseFloat(amount)

    if (!amount || withdrawAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
      })
      return
    }

    if (withdrawAmount > activeAccount.balance) {
      toast({
        variant: "destructive",
        title: "Insufficient funds",
        description: "You don't have enough funds to complete this withdrawal.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = await withdraw(withdrawAmount, description || "Withdrawal")

      if (success) {
        toast({
          title: "Withdrawal successful",
          description: `$${withdrawAmount.toFixed(2)} has been withdrawn from your account.`,
        })

        // Reset form
        setAmount("")
        setDescription("")
      } else {
        toast({
          variant: "destructive",
          title: "Withdrawal failed",
          description: "An error occurred. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Withdrawal failed",
        description: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>
          Withdraw money from your account. Current balance: ${activeAccount.balance.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="withdraw-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-sm text-muted-foreground">$</span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0.01"
                max={activeAccount.balance}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this withdrawal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="withdraw-form" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Withdraw Funds"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
