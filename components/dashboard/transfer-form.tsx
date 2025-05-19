"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useBanking } from "@/lib/banking-context"

export default function TransferForm() {
  const [amount, setAmount] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [transferType, setTransferType] = useState("internal")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { transfer, activeAccount } = useBanking()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const transferAmount = Number.parseFloat(amount)

    if (!amount || transferAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
      })
      return
    }

    if (transferAmount > activeAccount.balance) {
      toast({
        variant: "destructive",
        title: "Insufficient funds",
        description: "You don't have enough funds to complete this transfer.",
      })
      return
    }

    if (!recipientAccount) {
      toast({
        variant: "destructive",
        title: "Missing recipient",
        description: "Please enter a recipient account number.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await transfer(transferAmount, recipientAccount, recipientName || "Unknown Recipient", description || "Transfer")

      toast({
        title: "Transfer successful",
        description: `$${transferAmount.toFixed(2)} has been transferred to ${recipientName || recipientAccount}.`,
      })

      // Reset form
      setAmount("")
      setRecipientAccount("")
      setRecipientName("")
      setDescription("")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transfer failed",
        description: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>Send money to another account. Current balance: ${activeAccount.balance.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="transfer-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transferType">Transfer Type</Label>
            <Select value={transferType} onValueChange={setTransferType} disabled={isLoading}>
              <SelectTrigger id="transferType">
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Transfer</SelectItem>
                <SelectItem value="external">External Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="recipientAccount">Recipient Account Number</Label>
            <Input
              id="recipientAccount"
              placeholder="Enter account number"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name (Optional)</Label>
            <Input
              id="recipientName"
              placeholder="Enter recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this transfer"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="transfer-form" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Transfer Funds"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
