export interface Transaction {
  id: string
  accountId: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  description: string
  date: string
}
