"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBanking } from "@/lib/banking-context"

export default function AccountSelector() {
  const { accounts, activeAccount, setActiveAccount } = useBanking()
  const [isOpen, setIsOpen] = useState(false)

  // Add safety check for when accounts or activeAccount is undefined
  if (!accounts || !activeAccount || accounts.length <= 1) {
    return null
  }

  const handleAccountChange = (accountId: string) => {
    setActiveAccount(accountId)
    setIsOpen(false)
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>
            {getAccountTypeLabel(activeAccount.type)} ({activeAccount.accountNumber.slice(-4)})
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.id}
            onClick={() => handleAccountChange(account.id)}
            className={activeAccount.id === account.id ? "bg-muted" : ""}
          >
            <div className="flex w-full flex-col">
              <span className="font-medium">{getAccountTypeLabel(account.type)} Account</span>
              <span className="text-xs text-muted-foreground">
                {account.accountNumber.slice(-4)} · ${account.balance.toFixed(2)}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
