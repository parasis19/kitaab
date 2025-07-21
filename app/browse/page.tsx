"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Filter, Grid3X3, List, Search, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Sample data for books
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    genre: "Fiction",
    condition: "New",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    genre: "Self-Help",
    condition: "New",
  },
  {
    id: 3,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 12.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    genre: "Fiction",
    condition: "Used - Like New",
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 13.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    genre: "Biography",
    condition: "Used - Good",
  },
  {
    id: 5,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 15.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    genre: "Fiction",
    condition: "New",
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 11.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.3,
    genre: "Thriller",
    condition: "Used - Acceptable",
  },
  {
    id: 7,
    title: "Becoming",
    author: "Michelle Obama",
    price: 18.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    genre: "Biography",
    condition: "New",
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 9.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    genre: "Fiction",
    condition: "Used - Like New",
  },
  {
    id: 9,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 17.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    genre: "Non-Fiction",
    condition: "New",
  },
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 8.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    genre: "Fiction",
    condition: "Used - Good",
  },
  {
    id: 11,
    title: "Dune",
    author: "Frank Herbert",
    price: 14.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    genre: "Science Fiction",
    condition: "New",
  },
  {
    id: 12,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 12.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    genre: "Fantasy",
    condition: "Used - Like New",
  },
]

// Filter options
const genres = ["Fiction", "Non-Fiction", "Biography", "Self-Help", "Thriller", "Science Fiction", "Fantasy"]
const conditions = ["New", "Used - Like New", "Used - Good", "Used - Acceptable"]

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")

  // Filter books based on selected filters
  const filteredBooks = books.filter((book) => {
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre)
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(book.condition)
    return matchesPrice && matchesGenre && matchesCondition
  })

  // Sort books based on selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  // Toggle condition selection
  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 50])
    setSelectedGenres([])
    setSelectedConditions([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by title, author, or ISBN..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 50]}
                        max={50}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  <Accordion type="single" collapsible defaultValue="genres">
                    <AccordionItem value="genres">
                      <AccordionTrigger>Genres</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {genres.map((genre) => (
                            <div key={genre} className="flex items-center space-x-2">
                              <Checkbox
                                id={`genre-${genre}`}
                                checked={selectedGenres.includes(genre)}
                                onCheckedChange={() => toggleGenre(genre)}
                              />
                              <label
                                htmlFor={`genre-${genre}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {genre}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Conditions */}
                  <Accordion type="single" collapsible defaultValue="conditions">
                    <AccordionItem value="conditions">
                      <AccordionTrigger>Condition</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {conditions.map((condition) => (
                            <div key={condition} className="flex items-center space-x-2">
                              <Checkbox
                                id={`condition-${condition}`}
                                checked={selectedConditions.includes(condition)}
                                onCheckedChange={() => toggleCondition(condition)}
                              />
                              <label
                                htmlFor={`condition-${condition}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {condition}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-muted" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-muted" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <Slider defaultValue={[0, 50]} max={50} step={1} value={priceRange} onValueChange={setPriceRange} />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <Accordion type="single" collapsible defaultValue="genres">
                <AccordionItem value="genres">
                  <AccordionTrigger>Genres</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {genres.map((genre) => (
                        <div key={genre} className="flex items-center space-x-2">
                          <Checkbox
                            id={`genre-${genre}`}
                            checked={selectedGenres.includes(genre)}
                            onCheckedChange={() => toggleGenre(genre)}
                          />
                          <label
                            htmlFor={`genre-${genre}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {genre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Conditions */}
              <Accordion type="single" collapsible defaultValue="conditions">
                <AccordionItem value="conditions">
                  <AccordionTrigger>Condition</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={`condition-${condition}`}
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={() => toggleCondition(condition)}
                          />
                          <label
                            htmlFor={`condition-${condition}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        <div className="flex-grow">
          {/* Mobile Sort */}
          <div className="flex md:hidden justify-between items-center mb-4">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedGenres.length > 0 || selectedConditions.length > 0 || priceRange[0] > 0 || priceRange[1] < 50) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGenres.map((genre) => (
                <Button
                  key={genre}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleGenre(genre)}
                  className="h-7 text-xs"
                >
                  {genre} <X className="ml-1 h-3 w-3" />
                </Button>
              ))}
              {selectedConditions.map((condition) => (
                <Button
                  key={condition}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCondition(condition)}
                  className="h-7 text-xs"
                >
                  {condition} <X className="ml-1 h-3 w-3" />
                </Button>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 50) && (
                <Button variant="outline" size="sm" onClick={() => setPriceRange([0, 50])} className="h-7 text-xs">
                  ${priceRange[0]} - ${priceRange[1]} <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                Clear All
              </Button>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-4">Showing {sortedBooks.length} results</p>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedBooks.map((book) => (
                <motion.div key={book.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
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
                        <p className="text-xs text-muted-foreground mt-1">{book.condition}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBooks.map((book) => (
                <motion.div key={book.id} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href={`/books/${book.id}`}>
                    <Card className="overflow-hidden">
                      <div className="flex">
                        <div className="relative w-24 sm:w-32 md:w-40 shrink-0">
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            width={160}
                            height={240}
                            className="object-cover h-full"
                          />
                        </div>
                        <CardContent className="p-4 flex-grow">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-semibold">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {book.genre} • {book.condition}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="font-medium">${book.price.toFixed(2)}</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm ml-1">{book.rating}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

