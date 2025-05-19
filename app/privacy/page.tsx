"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Banking App Privacy Policy</CardTitle>
            <CardDescription>Last updated: May 19, 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <section className="space-y-2">
              <h2 className="text-lg font-semibold">1. Introduction</h2>
              <p>
                This Privacy Policy explains how Banking App collects, uses, and protects your information when you use
                our web application. We are committed to ensuring the privacy and security of your data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">2. Information Collection</h2>
              <p>
                <strong>Local Storage:</strong> Our application uses localStorage to store your data directly on your
                device. This includes:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Account information (name, email, password)</li>
                <li>Transaction history</li>
                <li>Account balances</li>
                <li>User preferences</li>
                <li>Profile information</li>
                <li>Contact form submissions</li>
              </ul>
              <p>
                <strong>Important:</strong> This data remains on your device and is not transmitted to our servers or
                third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">3. How We Use Your Information</h2>
              <p>The information stored in localStorage is used to:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Provide and maintain the banking simulation experience</li>
                <li>Remember your login status</li>
                <li>Display your account information and transaction history</li>
                <li>Customize your user experience</li>
                <li>Store your preferences (such as dark/light mode)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">4. Data Security</h2>
              <p>
                While we implement reasonable measures to protect your data within the application, please be aware
                that:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>
                  localStorage is not encrypted by default, and data stored there may be accessible to other scripts
                  running on the same domain
                </li>
                <li>Clearing your browser data will erase all information stored in localStorage</li>
                <li>
                  We recommend using this application on private, secure devices and not on shared or public computers
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">5. Data Retention</h2>
              <p>Your data remains in localStorage until you:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Clear your browser data</li>
                <li>Manually delete items from localStorage</li>
                <li>Use the application's logout feature (which removes authentication data)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">6. Third-Party Access</h2>
              <p>
                We do not share your data with third parties as all information is stored locally on your device.
                However, be aware that browser extensions or other applications with access to localStorage may be able
                to access this data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-inside list-disc space-y-1 pl-4">
                <li>Access your data (which is already directly accessible on your device)</li>
                <li>Delete your data by clearing your browser's localStorage</li>
                <li>Update your information through the profile management features</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">8. Children's Privacy</h2>
              <p>
                Our application is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through the contact form
                available in the application.
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
