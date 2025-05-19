export interface Account {
  id: string
  userId: string
  accountNumber: string
  balance: number
  type: "checking" | "savings" | "investment"
  isActive: boolean
  createdAt: string
}
