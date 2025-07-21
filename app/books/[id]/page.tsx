"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Heart, MessageCircle, Share, ShoppingCart, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample book data
const book = {
  id: 1,
  title: "The Midnight Library",
  author: "Matt Haig",
  price: 14.99,
  originalPrice: 19.99,
  coverImage: "/placeholder.svg?height=600&width=400",
  rating: 4.5,
  reviewCount: 128,
  genre: "Fiction",
  condition: "New",
  isbn: "9780525559474",
  publisher: "Viking",
  publishDate: "September 29, 2020",
  pages: 304,
  language: "English",
  description:
    "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
  sellerName: "BookHaven",
  sellerRating: 4.8,
  sellerSales: 342,
  inStock: true,
  quantity: 5,
  shipping: "Free shipping",
  deliveryDate: "Estimated delivery: 3-5 business days",
}

// Sample reviews
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "March 15, 2023",
    comment:
      "This book completely changed my perspective on life. The concept is fascinating and the writing is beautiful. I couldn't put it down!",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "February 28, 2023",
    comment:
      "A thought-provoking read that makes you reflect on your own choices. The characters are well-developed and relatable.",
  },
  {
    id: 3,
    user: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "January 10, 2023",
    comment:
      "One of the best books I've read in years. The concept is unique and the execution is flawless. Highly recommend!",
  },
]

// Sample related books
const relatedBooks = [
  {
    id: 2,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    price: 16.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 15.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: 13.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.3,
  },
  {
    id: 5,
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 14.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
  },
]

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  const incrementQuantity = () => {
    if (quantity < book.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Book Image */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[2/3] max-w-md w-full bg-muted rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Book Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : i < book.rating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{book.rating}</span>
            </div>
            <Separator orientation="vertical" className="mx-3 h-5" />
            <span className="text-sm text-muted-foreground">{book.reviewCount} reviews</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
              {book.originalPrice && (
                <Badge className="ml-3 bg-green-600">
                  {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">In stock: {book.quantity} available</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-none"
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= book.quantity}
                className="h-10 w-10 rounded-none"
              >
                +
              </Button>
            </div>
            <Button className="flex-grow" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10" onClick={toggleWishlist}>
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{book.shipping}</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{book.condition}</span>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={book.sellerName} />
                <AvatarFallback>{book.sellerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Sold by: {book.sellerName}</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs ml-1">
                    {book.sellerRating} • {book.sellerSales} sales
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Seller
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Book Information Tabs */}
      <Tabs defaultValue="description" className="mb-12" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Book Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{book.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-4">Book Information</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span>{book.isbn}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Publisher:</span>
                  <span>{book.publisher}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Publication Date:</span>
                  <span>{book.publishDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Pages:</span>
                  <span>{book.pages}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span>{book.language}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Shipping Information</h3>
              <p className="text-sm mb-2">{book.deliveryDate}</p>
              <p className="text-sm">
                Returns are accepted within 30 days of delivery if the book is in its original condition.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="pb-6 border-b last:border-0">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={review.user.avatar} alt={review.user.name} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Write a Review
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Books */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedBooks.map((relatedBook) => (
            <motion.div key={relatedBook.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href={`/books/${relatedBook.id}`}>
                <div className="overflow-hidden rounded-lg border bg-background">
                  <div className="relative aspect-[2/3] bg-muted">
                    <Image
                      src={relatedBook.coverImage || "/placeholder.svg"}
                      alt={relatedBook.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{relatedBook.title}</h3>
                    <p className="text-sm text-muted-foreground">{relatedBook.author}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">${relatedBook.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{relatedBook.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

