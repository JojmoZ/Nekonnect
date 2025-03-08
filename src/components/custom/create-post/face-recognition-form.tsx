"use client"

import { useState, useEffect } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { User, Camera, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import type { useVerifyFace } from "@/hooks/user/use-verify-face"
import { toast } from "sonner";

interface ChildProps {
  verificator: ReturnType<typeof useVerifyFace>
}

export function FaceRecognitionForm({ verificator }: ChildProps) {
  const [cameraAvailable, setCameraAvailable] = useState<boolean>(true)
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(3)
  const [captureSuccess, setCaptureSuccess] = useState<boolean>(false)

  const startCountdown = () => {
    setIsCountingDown(true)
    setCountdown(3)
    setCaptureSuccess(false)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (isCountingDown && countdown === 0) {
      verificator.captureFace()
      setIsCountingDown(false)
      setCaptureSuccess(true)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isCountingDown, countdown, verificator])

  useEffect(() => {
    if (verificator.message) {
      if (verificator.message.includes("Same Face")) {
        toast.success("Face Recognition", {
          description: verificator.message,
        });
      } else {
        toast.error("Face Recognition", {
          description: verificator.message,
        });
      }
    }
  }, [verificator.message]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Face Recognition</h2>
        <p className="text-muted-foreground">We use face recognition to verify your identity when posting loans.</p>
      </div>

      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription className="text-sm">
          Face recognition is required when posting a loan. You can complete this step now or later.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4 text-primary"/>
        <AlertTitle>Note</AlertTitle>
        <AlertDescription className="text-sm">
          Please make sure that you have captured your face before. If you haven't captured your face, please do so by
          navigating to Profile <ChevronRight className="inline h-3 w-3" /> Edit Profile.
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          {cameraAvailable ? (
            <>
              <Webcam
                ref={verificator.webcamRef}
                className="w-full rounded-lg"
                screenshotFormat="image/png"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                onUserMedia={() => setCameraAvailable(true)}
                onUserMediaError={() => setCameraAvailable(false)}
              />

              {/* Capture guide overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                {isCountingDown && (
                  <div className="bg-black/50 text-white text-6xl font-bold rounded-full h-24 w-24 flex items-center justify-center">
                    {countdown}
                  </div>
                )}

                {!isCountingDown && !verificator.capturedFace && (
                  <div className="text-center bg-black/50 text-white p-3 rounded-lg max-w-xs">
                    <p>Position your face in the center and ensure good lighting</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center bg-muted p-8 h-[300px]">
              <User className="text-muted-foreground w-16 h-16 mb-4" />
              <p className="text-destructive font-medium mb-2">Camera not detected</p>
              <p className="text-muted-foreground text-center max-w-xs">
                Please allow camera access in your browser settings and refresh the page.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {verificator.capturedFace ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Face captured successfully!</span>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <img
                src={verificator.capturedFace || "/placeholder.svg"}
                alt="Captured Face"
                className="w-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={startCountdown}
                className="flex-1"
                disabled={!cameraAvailable || isCountingDown}
              >
                Retake Photo
              </Button>
              <Button type="button" onClick={verificator.verifyFace} disabled={verificator.loading} className="flex-1">
                Start Recognition
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            onClick={startCountdown}
            className="w-full gap-2"
            disabled={!cameraAvailable || isCountingDown}
          >
            <Camera className="h-4 w-4" />
            {isCountingDown ? `Capturing in ${countdown}...` : "Capture Face"}
          </Button>
        )}

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-medium">Tips for a good capture:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Ensure your face is well-lit and clearly visible</li>
            <li>Remove glasses, hats, or other face coverings</li>
            <li>Look directly at the camera with a neutral expression</li>
            <li>Keep your head centered in the frame</li>
          </ul>
        </div>
      </div>
    </div>
  )
}