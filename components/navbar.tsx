"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, FileText, HelpCircle, Menu, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={closeMenu}>
          <CreditCard className="h-6 w-6" />
          <span>FARM Banking Management</span>
        </Link>
        <nav className="hidden md:flex md:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground/60"}`}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground/60"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/profile") ? "text-primary" : "text-foreground/60"}`}
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/login") ? "text-primary" : "text-foreground/60"}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/register") ? "text-primary" : "text-foreground/60"}`}
              >
                Register
              </Link>
            </>
          )}
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-foreground/60"}`}
          >
            Contact
          </Link>
         
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 pb-6 pt-2">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground/60"}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground/60"}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/profile") ? "text-primary" : "text-foreground/60"}`}
                  onClick={closeMenu}
                >
                  <User className="mr-2 inline-block h-4 w-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className="text-left text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/login") ? "text-primary" : "text-foreground/60"}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/register") ? "text-primary" : "text-foreground/60"}`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-foreground/60"}`}
              onClick={closeMenu}
            >
              <HelpCircle className="mr-2 inline-block h-4 w-4" />
              Contact
            </Link>
            <div className="border-t pt-2">
              <p className="mb-2 text-sm font-medium text-foreground/60">Legal</p>
              <Link
                href="/terms"
                className="block py-1 pl-4 text-sm text-foreground/60 hover:text-primary"
                onClick={closeMenu}
              >
                <FileText className="mr-2 inline-block h-4 w-4" />
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="block py-1 pl-4 text-sm text-foreground/60 hover:text-primary"
                onClick={closeMenu}
              >
                <FileText className="mr-2 inline-block h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
