"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Activity, ArrowDownUp, CreditCard, DollarSign, Loader2, Plus, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useBanking } from "@/lib/banking-context"
import AccountSelector from "@/components/dashboard/account-selector"
import AccountSummary from "@/components/dashboard/account-summary"
import DepositForm from "@/components/dashboard/deposit-form"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import SpendingChart from "@/components/dashboard/spending-chart"
import TransferForm from "@/components/dashboard/transfer-form"
import WithdrawForm from "@/components/dashboard/withdraw-form"
import Navbar from "@/components/navbar"

export default function Dashboard() {
  const { user } = useAuth()
  const { activeAccount, accounts } = useBanking()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Add a loading state to ensure data is ready
  useEffect(() => {
    // Check if account data is loaded
    if (activeAccount && activeAccount.id) {
      setIsLoading(false)
    }

    // Set a timeout to prevent infinite loading if something goes wrong
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [activeAccount])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Loading your banking dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-10">
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h2>
          <div className="flex items-center gap-2">
            <AccountSelector />
            <Link href="/profile">
              <Button variant="outline" size="sm" className="h-9">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </Link>
            <Link href="/accounts/new">
              <Button size="sm" className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </Link>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${activeAccount ? activeAccount.balance.toFixed(2) : "0.00"}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,245.80</div>
                  <p className="text-xs text-muted-foreground">+10.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,350.00</div>
                  <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{accounts?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {accounts && accounts.length > 1 ? `${accounts.length} accounts` : "1 account"}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <AccountSummary />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your recent transactions across all accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Spending Overview</CardTitle>
                  <CardDescription>Your spending patterns for the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SpendingChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used banking actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="flex h-24 flex-col items-center justify-center gap-1"
                      onClick={() => setActiveTab("deposit")}
                    >
                      <DollarSign className="h-8 w-8 text-primary" />
                      <span>Deposit</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex h-24 flex-col items-center justify-center gap-1"
                      onClick={() => setActiveTab("withdraw")}
                    >
                      <CreditCard className="h-8 w-8 text-primary" />
                      <span>Withdraw</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex h-24 flex-col items-center justify-center gap-1"
                      onClick={() => setActiveTab("transfer")}
                    >
                      <Send className="h-8 w-8 text-primary" />
                      <span>Transfer</span>
                    </Button>
                    <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1">
                      <Activity className="h-8 w-8 text-primary" />
                      <span>Activity</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="deposit" className="space-y-4">
            <DepositForm />
          </TabsContent>
          <TabsContent value="withdraw" className="space-y-4">
            <WithdrawForm />
          </TabsContent>
          <TabsContent value="transfer" className="space-y-4">
            <TransferForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
