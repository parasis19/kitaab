"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, ShoppingBag, Star, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Sample data for featured books
const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
  },
  {
    id: 3,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 12.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 13.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 15.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
  },
]

// Sample data for categories
const categories = [
  { name: "Fiction", icon: BookOpen, count: 1245 },
  { name: "Non-Fiction", icon: BookOpen, count: 867 },
  { name: "Mystery", icon: BookOpen, count: 532 },
  { name: "Science Fiction", icon: BookOpen, count: 489 },
  { name: "Romance", icon: BookOpen, count: 675 },
  { name: "Biography", icon: BookOpen, count: 412 },
]

export default function Home() {
  const [hoveredBookId, setHoveredBookId] = useState<number | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Your Next <span className="text-primary">Favorite Book</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Buy and sell new and used books on REED, your one-stop destination for all things literary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/browse">
                    Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sell">Start Selling</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] hidden md:block"
            >
              <div className="absolute top-0 right-0 w-64 h-80 rotate-6 rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=400&width=300" alt="Book cover" fill className="object-cover" />
              </div>
              <div className="absolute top-20 right-48 w-64 h-80 -rotate-6 rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=400&width=300" alt="Book cover" fill className="object-cover" />
              </div>
              <div className="absolute top-40 right-24 w-64 h-80 rotate-3 rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=400&width=300" alt="Book cover" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Vast Selection</h3>
              <p className="text-muted-foreground">
                Discover millions of books across all genres, from bestsellers to rare finds.
              </p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Easy Selling</h3>
              <p className="text-muted-foreground">
                List your books for sale in minutes with our simple, user-friendly interface.
              </p>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow book lovers, share reviews, and discover recommendations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Books</h2>
              <p className="text-muted-foreground mt-2">Handpicked selections you'll love</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/browse">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {featuredBooks.map((book) => (
                <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link href={`/books/${book.id}`}>
                      <Card className="overflow-hidden h-full">
                        <div className="relative aspect-[2/3] bg-muted">
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">${book.price.toFixed(2)}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{book.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground mt-2">Find books in your favorite genre</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={item}>
                <Link href={`/categories/${category.name.toLowerCase()}`}>
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <category.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.count} books</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sell Your Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to Sell Your Books?</h2>
              <p className="text-lg text-muted-foreground">
                Turn your bookshelf into cash. List your books for sale in minutes and reach thousands of readers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span>Reach thousands of potential buyers</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span>Easy listing process with our user-friendly interface</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span>Secure payment processing and shipping options</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/sell">Start Selling Now</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] hidden md:block"
            >
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Selling books"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest book releases, special offers, and reading recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

