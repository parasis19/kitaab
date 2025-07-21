"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, Check, HelpCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

// Sample genres and conditions
const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Children's",
  "Young Adult",
  "Poetry",
  "Other",
]

const conditions = [
  { value: "new", label: "New", description: "Brand new, never used, in perfect condition" },
  { value: "like-new", label: "Like New", description: "Looks new and has no visible wear" },
  { value: "very-good", label: "Very Good", description: "Minor signs of wear, but well maintained" },
  { value: "good", label: "Good", description: "Some signs of wear and tear from normal use" },
  { value: "acceptable", label: "Acceptable", description: "Shows significant wear, but intact and readable" },
]

export default function SellPage() {
  const [images, setImages] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result.toString())
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(3) // Move to success step
    }, 2000)
  }

  // Next step
  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  // Previous step
  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sell Your Books</h1>
          <p className="text-muted-foreground">List your books for sale and reach thousands of potential buyers</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <span className="text-sm mt-2">Book Details</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <span className="text-sm mt-2">Pricing & Shipping</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-2">Review & Publish</span>
            </div>
          </div>
        </div>

        {/* Step 1: Book Details */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
                <CardDescription>Enter the details of the book you want to sell</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Book Title</Label>
                      <Input id="title" placeholder="Enter the book title" />
                    </div>

                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input id="author" placeholder="Enter the author's name" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="isbn">ISBN (Optional)</Label>
                        <Input id="isbn" placeholder="Enter ISBN number" />
                      </div>
                      <div>
                        <Label htmlFor="genre">Genre</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre.toLowerCase()}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="publisher">Publisher (Optional)</Label>
                        <Input id="publisher" placeholder="Enter publisher name" />
                      </div>
                      <div>
                        <Label htmlFor="publishDate">Publication Date (Optional)</Label>
                        <Input id="publishDate" type="date" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <Label htmlFor="condition">Condition</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                                <HelpCircle className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Select the condition that best describes your book's current state
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <RadioGroup defaultValue="new" className="space-y-3">
                        {conditions.map((condition) => (
                          <div key={condition.value} className="flex items-start space-x-2 rounded-md border p-3">
                            <RadioGroupItem value={condition.value} id={condition.value} className="mt-1" />
                            <div className="flex flex-col">
                              <Label htmlFor={condition.value} className="font-medium">
                                {condition.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{condition.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Provide a detailed description of the book" rows={4} />
                    </div>

                    <div>
                      <Label className="mb-2 block">Book Images</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-[3/4] rounded-md overflow-hidden border">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Book ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 rounded-full"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        {images.length < 5 && (
                          <label className="flex flex-col items-center justify-center aspect-[3/4] rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col items-center justify-center p-4">
                              <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm font-medium">Add Image</span>
                              <span className="text-xs text-muted-foreground mt-1">
                                {images.length === 0 ? "Add at least one image" : `${images.length}/5 images`}
                              </span>
                            </div>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              multiple={images.length < 4}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload up to 5 images of your book. The first image will be the cover image.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Continue to Pricing & Shipping
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Pricing & Shipping */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Shipping</CardTitle>
                <CardDescription>Set your price and shipping options</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input id="price" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" min="1" defaultValue="1" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <Label>Shipping Options</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                                <HelpCircle className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Choose how you want to handle shipping for your book</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <RadioGroup defaultValue="flat-rate" className="space-y-3">
                        <div className="flex items-start space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="flat-rate" id="flat-rate" className="mt-1" />
                          <div className="flex flex-col">
                            <Label htmlFor="flat-rate" className="font-medium">
                              Flat Rate Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">Charge a fixed shipping rate to all buyers</p>
                            <div className="mt-2">
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="Enter shipping cost"
                                className="max-w-xs"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="free-shipping" id="free-shipping" className="mt-1" />
                          <div className="flex flex-col">
                            <Label htmlFor="free-shipping" className="font-medium">
                              Free Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Offer free shipping to attract more buyers (shipping cost will be deducted from your
                              earnings)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="calculated" id="calculated" className="mt-1" />
                          <div className="flex flex-col">
                            <Label htmlFor="calculated" className="font-medium">
                              Calculated Shipping
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Shipping cost will be calculated based on buyer's location
                            </p>
                            <div className="mt-2 space-y-2">
                              <div>
                                <Label htmlFor="weight" className="text-sm">
                                  Package Weight (lbs)
                                </Label>
                                <Input
                                  id="weight"
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  placeholder="Enter package weight"
                                  className="max-w-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Seller Fees</h3>
                      <div className="bg-muted/50 rounded-md p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Platform Fee (10%)</span>
                            <span className="text-sm">Calculated at checkout</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Payment Processing (2.9% + $0.30)</span>
                            <span className="text-sm">Calculated at checkout</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Your Earnings</span>
                            <span>Calculated at checkout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Review Listing
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Review & Publish</CardTitle>
                <CardDescription>Review your listing details before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Success message if submitted */}
                  {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                      <h3 className="text-lg font-medium">Publishing your listing...</h3>
                      <p className="text-muted-foreground">This may take a few moments</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-medium mb-4">Book Details</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm text-muted-foreground">Title:</span>
                              <p className="font-medium">The Great Gatsby</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Author:</span>
                              <p className="font-medium">F. Scott Fitzgerald</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Genre:</span>
                              <p className="font-medium">Fiction</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Condition:</span>
                              <p className="font-medium">Very Good</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Description:</span>
                              <p className="text-sm">
                                Classic novel in very good condition. Minor wear on the cover, but pages are clean and
                                intact. 1995 Scribner paperback edition.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-4">Pricing & Shipping</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm text-muted-foreground">Price:</span>
                              <p className="font-medium">$12.99</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Quantity:</span>
                              <p className="font-medium">1</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Shipping:</span>
                              <p className="font-medium">Flat Rate - $3.99</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Estimated Earnings:</span>
                              <p className="font-medium">$14.39</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Book Images</h3>
                        <div className="grid grid-cols-5 gap-4">
                          {images.length > 0 ? (
                            images.map((image, index) => (
                              <div key={index} className="relative aspect-[3/4] rounded-md overflow-hidden border">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Book ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))
                          ) : (
                            <div className="col-span-5 flex items-center justify-center h-40 bg-muted/50 rounded-md">
                              <div className="text-center">
                                <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">No images uploaded</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-md p-4">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              By publishing this listing, you agree to our{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/seller-guidelines" className="text-primary hover:underline">
                                Seller Guidelines
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                          Publish Listing
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long will it take for my book to be listed?</AccordionTrigger>
                  <AccordionContent>
                    Your book will be listed immediately after you publish it. It will be visible to all users browsing
                    the platform.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I get paid when my book sells?</AccordionTrigger>
                  <AccordionContent>
                    When your book sells, the payment will be processed and held until the buyer confirms receipt. Once
                    confirmed, the funds will be transferred to your connected payment account within 2-3 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What fees will I be charged?</AccordionTrigger>
                  <AccordionContent>
                    REED charges a 10% platform fee on the total sale amount (including shipping). There is also a
                    payment processing fee of 2.9% + $0.30 per transaction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I ship my book when it sells?</AccordionTrigger>
                  <AccordionContent>
                    When your book sells, you'll receive a notification with the buyer's shipping information. You'll
                    need to ship the book within 3 business days and update the tracking information in your seller
                    dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I edit my listing after publishing?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can edit most details of your listing after publishing, including the price, description,
                    and shipping options. However, you cannot change the book title or author once published.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

