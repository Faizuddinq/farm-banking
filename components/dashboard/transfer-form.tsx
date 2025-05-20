"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
  const { transfer, activeAccount, accounts } = useBanking()
  const { toast } = useToast()
  const [otherAccounts, setOtherAccounts] = useState<Array<{ id: string; accountNumber: string; type: string }>>([])
  const [isAccountLoading, setIsAccountLoading] = useState(true)

  useEffect(() => {
    if (accounts && activeAccount) {
      const filtered = accounts
        .filter((account) => account.id !== activeAccount.id)
        .map((account) => ({
          id: account.id,
          accountNumber: account.accountNumber,
          type: account.type,
        }))
      setOtherAccounts(filtered)
      setIsAccountLoading(false)
    }
  }, [accounts, activeAccount])

  // Add safety check for when activeAccount is undefined
  if (!activeAccount || isAccountLoading) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
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
        description: "Please select or enter a recipient account number.",
      })
      return
    }

    // For internal transfers, check if trying to transfer to the same account
    if (transferType === "internal" && recipientAccount === activeAccount.id) {
      toast({
        variant: "destructive",
        title: "Invalid transfer",
        description: "You cannot transfer money to the same account.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = await transfer(
        transferAmount,
        recipientAccount,
        recipientName || "Unknown Recipient",
        description || "Transfer",
        transferType === "internal",
      )

      if (success) {
        toast({
          title: "Transfer successful",
          description: `$${transferAmount.toFixed(2)} has been transferred ${
            transferType === "internal" ? "to your other account" : `to ${recipientName || recipientAccount}`
          }.`,
        })

        // Reset form
        setAmount("")
        setRecipientAccount("")
        setRecipientName("")
        setDescription("")
      } else {
        toast({
          variant: "destructive",
          title: "Transfer failed",
          description: "An error occurred. Please try again.",
        })
      }
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

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case "checking":
        return "Checking"
      case "savings":
        return "Savings"
      case "investment":
        return "Investment"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>
          Send money to another account. Current balance: ${activeAccount.balance.toFixed(2)}
        </CardDescription>
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
                <SelectItem value="internal">Between My Accounts</SelectItem>
                <SelectItem value="external">To External Account</SelectItem>
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

          {transferType === "internal" ? (
            <div className="space-y-2">
              <Label htmlFor="internalRecipient">Select Account</Label>
              {otherAccounts.length > 0 ? (
                <Select
                  value={recipientAccount}
                  onValueChange={setRecipientAccount}
                  disabled={isLoading || otherAccounts.length === 0}
                >
                  <SelectTrigger id="internalRecipient">
                    <SelectValue placeholder="Select destination account" />
                  </SelectTrigger>
                  <SelectContent>
                    {otherAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {getAccountTypeLabel(account.type)} (****{account.accountNumber.slice(-4)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                  <p>You don't have any other accounts.</p>
                  <p className="mt-1">
                    <a href="/accounts/new" className="text-primary hover:underline">
                      Create a new account
                    </a>{" "}
                    to make internal transfers.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
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
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </>
          )}

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
        <Button
          type="submit"
          form="transfer-form"
          className="w-full"
          disabled={isLoading || (transferType === "internal" && otherAccounts.length === 0)}
        >
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
