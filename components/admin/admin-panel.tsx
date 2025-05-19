"use client"

import { useState } from "react"
import { Check, CreditCard, Lock, Unlock, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useBanking } from "@/lib/banking-context"
import Navbar from "@/components/navbar"

export default function AdminPanel() {
  const { users, updateUserStatus } = useAuth()
  const { transactions } = useBanking()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleStatus = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus(userId, isActive)
      toast({
        title: "User status updated",
        description: `User has been ${isActive ? "activated" : "deactivated"}.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update user status.",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-10">
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <User className="mr-2 h-4 w-4" />
              Admin Settings
            </Button>
          </div>
        </div>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-5 gap-4 border-t p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex items-center">{user.email}</div>
                      <div className="flex items-center">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {user.isActive ? (
                          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
                            <Check className="h-3 w-3" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900 dark:text-red-400">
                            <X className="h-3 w-3" /> Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleToggleStatus(user.id, !user.isActive)}>
                          {user.isActive ? (
                            <>
                              <Lock className="mr-2 h-3 w-3" /> Deactivate
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-3 w-3" /> Activate
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">No users found.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
                <CardDescription>View all transactions across the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>ID</div>
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Description</div>
                    <div>Date</div>
                  </div>
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-5 gap-4 border-t p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs">{transaction.id.slice(0, 8)}...</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.type === "deposit"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                              : transaction.type === "withdrawal"
                                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          }`}
                        >
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">₹{transaction.amount.toFixed(2)}</div>
                      <div className="flex items-center">{transaction.description}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">No transactions found.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
