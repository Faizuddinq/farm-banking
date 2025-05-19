"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { useBanking } from "@/lib/banking-context"

const data = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 9800 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
  { name: "Jul", amount: 4300 },
  { name: "Aug", amount: 5300 },
  { name: "Sep", amount: 4500 },
  { name: "Oct", amount: 5800 },
  { name: "Nov", amount: 6000 },
  { name: "Dec", amount: 8000 },
]

export default function AccountSummary() {
  const { activeAccount } = useBanking()

  // Add a safety check to handle the case when activeAccount is undefined
  if (!activeAccount) {
    return (
      <Card className="overflow-hidden rounded-xl border-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 p-6">
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-lg font-medium">Loading account data...</h3>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-xl border-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 p-6">
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-lg font-medium">
          {activeAccount.type.charAt(0).toUpperCase() + activeAccount.type.slice(1)} Account
        </h3>
        <p className="text-3xl font-bold">${activeAccount.balance.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Account #: {activeAccount.accountNumber}</p>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
