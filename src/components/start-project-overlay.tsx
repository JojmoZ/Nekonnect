"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import confetti from "canvas-confetti"

interface StartProjectOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const categories = ["Education", "Community", "Technology", "Environment", "Arts & Culture", "Wellness"]

export function StartProjectOverlay({ isOpen, onClose }: StartProjectOverlayProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = () => {
    // Here you would handle the actual project submission
    console.log("Project submitted:", { title, description, amount, category })

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Reset form and close overlay
    setTitle("")
    setDescription("")
    setAmount("")
    setCategory("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start a New Project</DialogTitle>
          <DialogDescription>Fill in the details below to create your new crowdfunding project.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Funding Goal</Label>
            <Input
              id="amount"
              placeholder="Enter funding goal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={!title || !description || !amount || !category}>
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

