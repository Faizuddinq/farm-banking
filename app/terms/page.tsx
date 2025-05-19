"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"

export default function TermsPage() {
  // Set terms as read in localStorage when user visits this page
  useEffect(() => {
    localStorage.setItem("termsAccepted", "true")
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 p-4 pt-6 md:p-8 md:pt-10">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Terms & Conditions</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Banking App Terms of Service</CardTitle>
            <CardDescription>Last updated: May 19, 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">1. Introduction</h2>
              <p>
                Welcome to Banking App. These Terms of Service govern your use of our web application and the services
                we provide. By accessing or using our application, you agree to be bound by these terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">2. Service Description</h2>
              <p>
                Banking App is a demonstration application that simulates banking services. It is not a real banking
                platform and does not involve actual financial transactions. All data is stored locally on your device
                using localStorage and no real money is involved.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">3. Account Registration</h2>
              <p>
                To use certain features of our application, you may need to register for an account. You agree to
                provide accurate information during the registration process and to keep your credentials secure. You
                are responsible for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Use the application for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of the application</li>
                <li>Interfere with the proper functioning of the application</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">5. Data Storage</h2>
              <p>This application uses localStorage to store your data on your device. This means:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Your data remains on your device and is not transmitted to our servers</li>
                <li>Clearing your browser data will result in the loss of all stored information</li>
                <li>We cannot recover your data if it is lost</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Banking App, including but not limited to text,
                graphics, logos, and code, are the exclusive property of Banking App and are protected by copyright,
                trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">7. Disclaimer of Warranties</h2>
              <p>
                The application is provided "as is" and "as available" without any warranties of any kind, either
                express or implied. We do not guarantee that the application will be error-free or uninterrupted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">8. Limitation of Liability</h2>
              <p>
                In no event shall Banking App be liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits, data, or use, arising out of or in
                connection with the use of the application.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will provide notice of significant changes by
                updating the date at the top of these terms. Your continued use of the application after such changes
                constitutes your acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">10. Contact Information</h2>
              <p>
                If you have any questions about these terms, please contact us through the contact form available in the
                application.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
