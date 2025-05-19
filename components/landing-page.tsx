"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, FileText, Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <section className="gradient-bg py-20 text-white md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div
                  className={`space-y-2 transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Banking Made Simple</h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Experience the future of banking with our secure, fast, and user-friendly platform.
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-2 min-[400px]:flex-row transition-all duration-500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10">
                      Learn More
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy Transactions</CardTitle>
                  <CardDescription>Send and receive money with just a few clicks.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our platform makes it easy to transfer money to friends, family, or businesses.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-secondary/10 p-2 w-fit">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Financial Insights</CardTitle>
                  <CardDescription>Track your spending and understand your finances.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Get detailed analytics and insights into your spending habits and financial health.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Banking</CardTitle>
                  <CardDescription>Your security is our top priority.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We use the latest security measures to ensure your money and data are safe.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-secondary/10 p-2 w-fit">
                    <Smartphone className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Mobile Banking</CardTitle>
                  <CardDescription>Bank from anywhere, anytime.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our responsive design ensures you can bank from any device, wherever you are.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Multiple Accounts</CardTitle>
                  <CardDescription>Manage all your finances in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Create and manage multiple account types including checking, savings, and investment accounts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to start your banking journey?
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Join thousands of satisfied customers who have already made the switch.
                  </p>
                </div>
                <div>
                  <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="bg-primary text-white hover:bg-primary-600">
                      {isAuthenticated ? "Go to Dashboard" : "Create an Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="text-xl dark:text-black font-bold">24/7 Support</h3>
                    <p className="text-sm text-gray-500">Our customer support team is always available to help you.</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="text-xl dark:text-black font-bold">No Hidden Fees</h3>
                    <p className="text-sm text-gray-500">We believe in transparency. No hidden fees or charges.</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="text-xl dark:text-black font-bold">Easy Setup</h3>
                    <p className="text-sm text-gray-500">Get started in minutes with our simple setup process.</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="text-xl dark:text-black font-bold">Secure</h3>
                    <p className="text-sm text-gray-500">
                      Your data and money are protected with the latest security measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
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
    </div>
  )
}
