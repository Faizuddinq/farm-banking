"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, CreditCard, Lock, Smartphone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import Navbar from "@/components/navbar"

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-bg py-20 text-white md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div
                  className={`space-y-2 transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Smart Banking for the Digital Era
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Manage your finances, transfers, and accounts all in one place—securely and instantly.
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-2 min-[400px]:flex-row transition-all duration-500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" variant="outline" className="bg-white text-primary dark:bg-black border-white dark:text-white hover:bg-gray-100">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-white text-primary dark:bg-black  dark:text-white hover:bg-white/10">
                      Explore Features
                    </Button>
                  </Link>
                </div>
              </div>
              <div
                className={`flex items-center justify-center transition-all duration-500 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="relative h-[350px] w-[350px] rounded-full bg-white/10 p-4">
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"></div>
                  <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"></div>
                  <div className="absolute left-1/2 top-1/2 flex h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary">
                    <CreditCard className="h-20 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section id="features" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features That Make Banking Better
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl">
                Our platform is designed to provide you with the best banking experience possible.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Instant Transfers</CardTitle>
                  <CardDescription>Send money instantly between your accounts or to others.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Transfer funds between accounts in seconds, with real-time updates and no hidden fees.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-secondary/10 p-2 w-fit">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Multi-Account Management</CardTitle>
                  <CardDescription>Manage all your accounts in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Create and manage multiple account types including checking, savings, and investment accounts.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Balances</CardTitle>
                  <CardDescription>Always know your financial position.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    View up-to-the-minute account balances and transaction history across all your accounts.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-secondary/10 p-2 w-fit">
                    <Lock className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Secure Transactions</CardTitle>
                  <CardDescription>Bank with confidence and peace of mind.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Advanced security measures protect your financial data and transactions at all times.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
                Getting started with our banking platform is simple and straightforward.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">1. Create Profile</h3>
                <p className="text-gray-500">
                  Sign up in minutes with just your email. No paperwork or branch visits required.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">2. Add Accounts</h3>
                <p className="text-gray-500">
                  Create multiple account types to organize your finances according to your needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <ArrowRight className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">3. Start Transferring</h3>
                <p className="text-gray-500">
                  Move money between accounts instantly or schedule transfers for later dates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account Types */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Account Types</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
                Choose the account types that best fit your financial goals and needs.
              </p>
            </div>
            <Tabs defaultValue="personal" className="mx-auto max-w-3xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Checking Account</CardTitle>
                    <CardDescription>For everyday banking needs and transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>No minimum balance requirements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Unlimited transactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Free online and mobile banking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Direct deposit and bill pay</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="savings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Savings Account</CardTitle>
                    <CardDescription>For building your financial future</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Competitive interest rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Automatic savings options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Goal-based savings features</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Limited monthly withdrawals</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="investment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Account</CardTitle>
                    <CardDescription>For long-term growth and wealth building</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Higher potential returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Portfolio management tools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Retirement planning options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Market insights and reports</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Transfer System */}
        <section className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">Seamless Transfer System</h2>
                <p className="mb-6 text-gray-500">
                  Our internal transfer system allows you to move money between your accounts instantly, with no fees or
                  waiting periods.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold">Select Source Account</h3>
                      <p className="text-sm text-gray-500">Choose which account you want to transfer from</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold">Select Destination Account</h3>
                      <p className="text-sm text-gray-500">Choose which account you want to transfer to</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold">Enter Amount & Confirm</h3>
                      <p className="text-sm text-gray-500">Specify the amount and complete your transfer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto aspect-square max-w-md">
                <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/30"></div>
                <div className="absolute left-1/4 top-1/4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <div className="text-center">
                    <p className="text-xs">Checking</p>
                    <p className="font-bold">$2,500</p>
                  </div>
                </div>
                <div className="absolute left-3/4 top-1/4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <div className="text-center">
                    <p className="text-xs">Savings</p>
                    <p className="font-bold">$5,000</p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-3/4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <div className="text-center">
                    <p className="text-xs">Investment</p>
                    <p className="font-bold">$10,000</p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Bank-Grade Security</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
                Your security is our top priority. We employ multiple layers of protection to keep your data and money
                safe.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">SSL Encryption</h3>
                <p className="text-sm text-gray-500">
                  All data is encrypted using bank-level SSL encryption to protect your personal information.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security with two-factor authentication for all sensitive operations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Privacy Compliant</h3>
                <p className="text-sm text-gray-500">
                  We adhere to strict privacy standards and never share your data with third parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
                Don't just take our word for it. Here's what our users have to say about their experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                      <div className="flex h-full w-full items-center justify-center text-primary">JD</div>
                    </div>
                    <div>
                      <h3 className="font-bold">John Doe</h3>
                      <p className="text-sm text-gray-500">Personal Account User</p>
                    </div>
                  </div>
                  <p className="italic text-gray-500">
                    "I've been using this banking app for 6 months now and it has completely transformed how I manage my
                    finances. The ability to transfer between my accounts instantly is a game-changer."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-secondary/10">
                      <div className="flex h-full w-full items-center justify-center text-secondary">JS</div>
                    </div>
                    <div>
                      <h3 className="font-bold">Jane Smith</h3>
                      <p className="text-sm text-gray-500">Business Account User</p>
                    </div>
                  </div>
                  <p className="italic text-gray-500">
                    "The multi-account management feature has been invaluable for my small business. I can keep personal
                    and business finances separate while managing everything in one place."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                      <div className="flex h-full w-full items-center justify-center text-primary">RJ</div>
                    </div>
                    <div>
                      <h3 className="font-bold">Robert Johnson</h3>
                      <p className="text-sm text-gray-500">Investment Account User</p>
                    </div>
                  </div>
                  <p className="italic text-gray-500">
                    "The security features give me peace of mind, and the user interface is intuitive and easy to
                    navigate. I've recommended this app to all my friends and family."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Take Control of Your Banking Today
              </h2>
              <p className="mb-8 text-gray-500 md:text-xl">
                Join thousands of satisfied users who have transformed their banking experience.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="w-full md:w-auto">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">No credit card required. Get started in under 2 minutes.</p>
            </div>
          </div>
        </section>

              <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <CreditCard className="h-6 w-6" />
              <span>FARM Banking Management</span>
            </Link>
            <p className="text-center text-sm text-gray-500 md:text-left">© 2025 FARM Banking Management. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
      </main>
    </div>
  )
}
