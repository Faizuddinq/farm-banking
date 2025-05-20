"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import type { Account } from "@/types/account"
import type { Transaction } from "@/types/transaction"

interface BankingContextType {
  accounts: Account[]
  activeAccount: Account
  transactions: Transaction[]
  deposit: (amount: number, description: string) => Promise<boolean>
  withdraw: (amount: number, description: string) => Promise<boolean>
  transfer: (
    amount: number,
    recipientAccount: string,
    recipientName: string,
    description: string,
    isInternal?: boolean,
  ) => Promise<boolean>
  createAccount: (type: "checking" | "savings" | "investment", initialDeposit: number) => Promise<boolean>
  setActiveAccount: (accountId: string) => void
}

const BankingContext = createContext<BankingContextType | undefined>(undefined)

export function BankingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [activeAccountId, setActiveAccountId] = useState<string>("")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Generate a random account number
  const generateAccountNumber = () => {
    return Math.floor(Math.random() * 9000000000 + 1000000000).toString()
  }

  // Initialize or load account data
  useEffect(() => {
    if (user) {
      // Load accounts from localStorage or create a new one
      const storedAccounts = localStorage.getItem("accounts")
      let userAccounts: Account[] = []

      if (storedAccounts) {
        const allAccounts: Account[] = JSON.parse(storedAccounts)
        userAccounts = allAccounts.filter((a) => a.userId === user.id)

        if (userAccounts.length === 0) {
          // Create a default account if user has no accounts
          const newAccount = createDefaultAccount(user.id)
          userAccounts = [newAccount]

          const updatedAccounts = [...allAccounts, newAccount]
          localStorage.setItem("accounts", JSON.stringify(updatedAccounts))

          // Create initial deposit transaction
          createInitialTransaction(newAccount.id)
        }
      } else {
        // No accounts in localStorage, create a default one
        const newAccount = createDefaultAccount(user.id)
        userAccounts = [newAccount]
        localStorage.setItem("accounts", JSON.stringify(userAccounts))

        // Create initial deposit transaction
        createInitialTransaction(newAccount.id)
      }

      setAccounts(userAccounts)

      // Set active account (first account or previously selected)
      const storedActiveAccountId = localStorage.getItem(`activeAccount_${user.id}`)
      const validAccountId =
        storedActiveAccountId && userAccounts.some((a) => a.id === storedActiveAccountId)
          ? storedActiveAccountId
          : userAccounts[0].id

      setActiveAccountId(validAccountId)
      localStorage.setItem(`activeAccount_${user.id}`, validAccountId)

      // Load transactions for user accounts
      const storedTransactions = localStorage.getItem("transactions")
      if (storedTransactions) {
        const allTransactions: Transaction[] = JSON.parse(storedTransactions)
        const userAccountIds = userAccounts.map((a) => a.id)
        const userTransactions = allTransactions.filter((t) => userAccountIds.includes(t.accountId))
        setTransactions(userTransactions)
      }
    }
  }, [user])

  const createDefaultAccount = (userId: string): Account => {
    return {
      id: uuidv4(),
      userId,
      accountNumber: generateAccountNumber(),
      balance: 1000, // Start with $1000 for demo
      type: "checking",
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  }

  const createInitialTransaction = (accountId: string) => {
    const initialTransaction: Transaction = {
      id: uuidv4(),
      accountId,
      amount: 1000,
      type: "deposit",
      description: "Initial deposit",
      date: new Date().toISOString(),
    }

    const storedTransactions = localStorage.getItem("transactions")
    const allTransactions: Transaction[] = storedTransactions ? JSON.parse(storedTransactions) : []
    allTransactions.push(initialTransaction)
    localStorage.setItem("transactions", JSON.stringify(allTransactions))

    // Update local transactions state
    setTransactions((prev) => [...prev, initialTransaction])
  }

  // Get the active account
  const activeAccount =
    accounts.find((a) => a.id === activeAccountId) || accounts[0] || createDefaultAccount(user?.id || "")

  // Set active account
  const setActiveAccount = (accountId: string) => {
    if (!user) return

    const accountExists = accounts.some((a) => a.id === accountId)
    if (accountExists) {
      setActiveAccountId(accountId)
      localStorage.setItem(`activeAccount_${user.id}`, accountId)
    }
  }

  // Create a new account
  const createAccount = async (
    type: "checking" | "savings" | "investment",
    initialDeposit: number,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!user) {
            toast({
              variant: "destructive",
              title: "Authentication error",
              description: "You must be logged in to create an account.",
            })
            resolve(false)
            return
          }

          // Create new account
          const newAccount: Account = {
            id: uuidv4(),
            userId: user.id,
            accountNumber: generateAccountNumber(),
            balance: initialDeposit,
            type,
            isActive: true,
            createdAt: new Date().toISOString(),
          }

          // Update accounts in localStorage
          const storedAccounts = localStorage.getItem("accounts")
          const allAccounts: Account[] = storedAccounts ? JSON.parse(storedAccounts) : []
          const updatedAccounts = [...allAccounts, newAccount]

          localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
          setAccounts((prev) => [...prev, newAccount])

          // Set as active account
          setActiveAccountId(newAccount.id)
          localStorage.setItem(`activeAccount_${user.id}`, newAccount.id)

          // Create initial deposit transaction
          const newTransaction: Transaction = {
            id: uuidv4(),
            accountId: newAccount.id,
            amount: initialDeposit,
            type: "deposit",
            description: "Initial deposit",
            date: new Date().toISOString(),
          }

          // Update transactions in localStorage
          const storedTransactions = localStorage.getItem("transactions")
          const allTransactions: Transaction[] = storedTransactions ? JSON.parse(storedTransactions) : []
          allTransactions.push(newTransaction)

          localStorage.setItem("transactions", JSON.stringify(allTransactions))
          setTransactions((prev) => [...prev, newTransaction])

          resolve(true)
        } catch (error) {
          console.error("Create account error:", error)
          toast({
            variant: "destructive",
            title: "Account creation failed",
            description: "An error occurred while creating your account.",
          })
          resolve(false)
        }
      }, 800) // Simulate network delay
    })
  }

  // Deposit money into account
  const deposit = async (amount: number, description: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!activeAccount) {
            toast({
              variant: "destructive",
              title: "Account error",
              description: "No active account found.",
            })
            resolve(false)
            return
          }

          // Update account balance
          const updatedAccount = { ...activeAccount, balance: activeAccount.balance + amount }

          // Update accounts in localStorage
          const storedAccounts = localStorage.getItem("accounts")
          let allAccounts: Account[] = storedAccounts ? JSON.parse(storedAccounts) : []
          allAccounts = allAccounts.map((a) => (a.id === activeAccount.id ? updatedAccount : a))

          localStorage.setItem("accounts", JSON.stringify(allAccounts))
          setAccounts(allAccounts.filter((a) => a.userId === user?.id))

          // Create transaction record
          const newTransaction: Transaction = {
            id: uuidv4(),
            accountId: activeAccount.id,
            amount,
            type: "deposit",
            description,
            date: new Date().toISOString(),
          }

          // Update transactions in localStorage
          const storedTransactions = localStorage.getItem("transactions")
          const allTransactions: Transaction[] = storedTransactions ? JSON.parse(storedTransactions) : []
          allTransactions.push(newTransaction)

          localStorage.setItem("transactions", JSON.stringify(allTransactions))
          setTransactions((prev) => [...prev, newTransaction])

          toast({
            title: "Deposit successful",
            description: `$${amount.toFixed(2)} has been deposited to your account.`,
          })

          resolve(true)
        } catch (error) {
          console.error("Deposit error:", error)
          toast({
            variant: "destructive",
            title: "Deposit failed",
            description: "An error occurred while processing your deposit.",
          })
          resolve(false)
        }
      }, 800) // Simulate network delay
    })
  }

  // Withdraw money from account
  const withdraw = async (amount: number, description: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!activeAccount) {
            toast({
              variant: "destructive",
              title: "Account error",
              description: "No active account found.",
            })
            resolve(false)
            return
          }

          if (amount <= 0) {
            toast({
              variant: "destructive",
              title: "Invalid amount",
              description: "Withdrawal amount must be greater than zero.",
            })
            resolve(false)
            return
          }

          if (amount > activeAccount.balance) {
            toast({
              variant: "destructive",
              title: "Insufficient funds",
              description: "You don't have enough funds to complete this withdrawal.",
            })
            resolve(false)
            return
          }

          // Update account balance
          const updatedAccount = { ...activeAccount, balance: activeAccount.balance - amount }

          // Update accounts in localStorage
          const storedAccounts = localStorage.getItem("accounts")
          let allAccounts: Account[] = storedAccounts ? JSON.parse(storedAccounts) : []
          allAccounts = allAccounts.map((a) => (a.id === activeAccount.id ? updatedAccount : a))

          localStorage.setItem("accounts", JSON.stringify(allAccounts))
          setAccounts(allAccounts.filter((a) => a.userId === user?.id))

          // Create transaction record
          const newTransaction: Transaction = {
            id: uuidv4(),
            accountId: activeAccount.id,
            amount,
            type: "withdrawal",
            description,
            date: new Date().toISOString(),
          }

          // Update transactions in localStorage
          const storedTransactions = localStorage.getItem("transactions")
          const allTransactions: Transaction[] = storedTransactions ? JSON.parse(storedTransactions) : []
          allTransactions.push(newTransaction)

          localStorage.setItem("transactions", JSON.stringify(allTransactions))
          setTransactions((prev) => [...prev, newTransaction])

          toast({
            title: "Withdrawal successful",
            description: `$${amount.toFixed(2)} has been withdrawn from your account.`,
          })

          resolve(true)
        } catch (error) {
          console.error("Withdrawal error:", error)
          toast({
            variant: "destructive",
            title: "Withdrawal failed",
            description: "An error occurred while processing your withdrawal.",
          })
          resolve(false)
        }
      }, 800) // Simulate network delay
    })
  }

  // Transfer money to another account
  const transfer = async (
    amount: number,
    recipientAccountId: string,
    recipientName: string,
    description: string,
    isInternal = false,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!activeAccount) {
            toast({
              variant: "destructive",
              title: "Account error",
              description: "No active account found.",
            })
            resolve(false)
            return
          }

          if (amount <= 0) {
            toast({
              variant: "destructive",
              title: "Invalid amount",
              description: "Transfer amount must be greater than zero.",
            })
            resolve(false)
            return
          }

          if (amount > activeAccount.balance) {
            toast({
              variant: "destructive",
              title: "Insufficient funds",
              description: "You don't have enough funds to complete this transfer.",
            })
            resolve(false)
            return
          }

          if (isInternal && recipientAccountId === activeAccount.id) {
            toast({
              variant: "destructive",
              title: "Invalid transfer",
              description: "You cannot transfer money to the same account.",
            })
            resolve(false)
            return
          }

          // Get all accounts from localStorage
          const storedAccounts = localStorage.getItem("accounts")
          let allAccounts: Account[] = storedAccounts ? JSON.parse(storedAccounts) : []

          // Update sender account balance
          const updatedSenderAccount = { ...activeAccount, balance: activeAccount.balance - amount }

          // For internal transfers, find and update the recipient account
          let updatedRecipientAccount: Account | null = null

          if (isInternal) {
            // Find the recipient account in the user's accounts
            const recipientAccount = allAccounts.find((a) => a.id === recipientAccountId)

            if (!recipientAccount) {
              toast({
                variant: "destructive",
                title: "Recipient not found",
                description: "The recipient account could not be found.",
              })
              resolve(false)
              return
            }

            // Verify the recipient account belongs to the same user
            if (recipientAccount.userId !== user?.id) {
              toast({
                variant: "destructive",
                title: "Unauthorized transfer",
                description: "You can only transfer between your own accounts.",
              })
              resolve(false)
              return
            }

            // Update recipient account balance
            updatedRecipientAccount = {
              ...recipientAccount,
              balance: recipientAccount.balance + amount,
            }

            // Get recipient account type for better description
            const recipientType = recipientAccount.type.charAt(0).toUpperCase() + recipientAccount.type.slice(1)
            recipientName = `${recipientType} (****${recipientAccount.accountNumber.slice(-4)})`
          }

          // Update accounts in localStorage
          allAccounts = allAccounts.map((a) => {
            if (a.id === activeAccount.id) return updatedSenderAccount
            if (isInternal && updatedRecipientAccount && a.id === recipientAccountId) return updatedRecipientAccount
            return a
          })

          localStorage.setItem("accounts", JSON.stringify(allAccounts))

          // Update accounts state with user's accounts
          setAccounts(allAccounts.filter((a) => a.userId === user?.id))

          // Create transaction records
          const timestamp = new Date().toISOString()

          // Sender transaction
          const senderTransaction: Transaction = {
            id: uuidv4(),
            accountId: activeAccount.id,
            amount,
            type: "transfer",
            description: `${description} to ${recipientName}${isInternal ? " (Internal)" : ""}`,
            date: timestamp,
          }

          // Recipient transaction (for internal transfers only)
          let recipientTransaction: Transaction | null = null
          if (isInternal && updatedRecipientAccount) {
            recipientTransaction = {
              id: uuidv4(),
              accountId: recipientAccountId,
              amount,
              type: "deposit",
              description: `Transfer from ${activeAccount.type.charAt(0).toUpperCase() + activeAccount.type.slice(1)} (****${activeAccount.accountNumber.slice(-4)})`,
              date: timestamp,
            }
          }

          // Update transactions in localStorage
          const storedTransactions = localStorage.getItem("transactions")
          const allTransactions: Transaction[] = storedTransactions ? JSON.parse(storedTransactions) : []

          allTransactions.push(senderTransaction)
          if (recipientTransaction) allTransactions.push(recipientTransaction)

          localStorage.setItem("transactions", JSON.stringify(allTransactions))

          // Update transactions state
          const newTransactions = [senderTransaction]
          if (recipientTransaction) newTransactions.push(recipientTransaction)

          setTransactions((prev) => [...prev, ...newTransactions])

          toast({
            title: "Transfer successful",
            description: `$${amount.toFixed(2)} has been transferred to ${isInternal ? "your other account" : recipientName}.`,
          })

          resolve(true)
        } catch (error) {
          console.error("Transfer error:", error)
          toast({
            variant: "destructive",
            title: "Transfer failed",
            description: "An error occurred while processing your transfer.",
          })
          resolve(false)
        }
      }, 800) // Simulate network delay
    })
  }

  return (
    <BankingContext.Provider
      value={{
        accounts,
        activeAccount,
        transactions,
        deposit,
        withdraw,
        transfer,
        createAccount,
        setActiveAccount,
      }}
    >
      {children}
    </BankingContext.Provider>
  )
}

export function useBanking() {
  const context = useContext(BankingContext)
  if (context === undefined) {
    throw new Error("useBanking must be used within a BankingProvider")
  }
  return context
}
