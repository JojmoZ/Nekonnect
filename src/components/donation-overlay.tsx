import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import confetti from "canvas-confetti"

interface DonationOverlayProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

export function DonationOverlay({ isOpen, onClose, projectTitle }: DonationOverlayProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [name, setName] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"check" | "credit" | null>(null)

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Here you would handle the actual donation submission
    console.log("Donation submitted:", { amount, isAnonymous, name, paymentMethod })
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support {projectTitle}</DialogTitle>
          <DialogDescription>Choose your donation amount and method to support this project.</DialogDescription>
        </DialogHeader>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="1"
              />
            </div>
            <Button onClick={handleNextStep} className="w-full">
              Next
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Donation Type</Label>
              <div className="flex space-x-4">
                <Button
                  variant={isAnonymous ? "default" : "outline"}
                  onClick={() => setIsAnonymous(true)}
                  className="flex-1"
                >
                  Anonymous
                </Button>
                <Button
                  variant={!isAnonymous ? "default" : "outline"}
                  onClick={() => setIsAnonymous(false)}
                  className="flex-1"
                >
                  Named
                </Button>
              </div>
            </div>
            {!isAnonymous && (
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="flex justify-between">
              <Button onClick={handlePreviousStep} variant="outline">
                Back
              </Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-4 h-16"
                  onClick={() => setPaymentMethod("check")}
                >
                  Check by Mail
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-4 h-16"
                  onClick={() => setPaymentMethod("credit")}
                >
                  Credit Card
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handlePreviousStep} variant="outline">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!paymentMethod}>
                Donate
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

