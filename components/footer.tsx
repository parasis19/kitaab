import Link from "next/link"
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">REED</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for buying and selling books online.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-primary">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-muted-foreground hover:text-primary">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-muted-foreground hover:text-primary">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Sell</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller-guidelines" className="text-muted-foreground hover:text-primary">
                  Seller Guidelines
                </Link>
              </li>
              <li>
                <Link href="/seller-dashboard" className="text-muted-foreground hover:text-primary">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} REED Bookstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

