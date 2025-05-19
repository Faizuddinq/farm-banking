"use client"

import { ArrowDown, ArrowUp, CreditCard } from "lucide-react"
import { useBanking } from "@/lib/banking-context"

export default function RecentTransactions() {
  const { transactions, activeAccount } = useBanking()

  // Add a safety check for when transactions or activeAccount is undefined
  if (!transactions || !activeAccount) {
    return (
      <div className="flex h-[200px] items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    )
  }

  // Get the 5 most recent transactions for the active account
  const recentTransactions = [...transactions]
    .filter((transaction) => transaction.accountId === activeAccount.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  if (recentTransactions.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">No transactions yet</p>
          <p className="text-xs text-muted-foreground">Your recent transactions will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              transaction.type === "deposit"
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                : transaction.type === "withdrawal"
                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
            }`}
          >
            {transaction.type === "deposit" ? (
              <ArrowDown className="h-5 w-5" />
            ) : transaction.type === "withdrawal" ? (
              <ArrowUp className="h-5 w-5" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          <div
            className={`text-sm font-medium ${
              transaction.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
