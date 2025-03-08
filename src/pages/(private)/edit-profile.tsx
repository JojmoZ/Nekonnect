"use client"

import { useState, useEffect, useCallback } from "react"
import Webcam from "react-webcam"
import { FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import PersonalInformationForm from "@/components/custom/profile/personal-information-form"
import Stepper from "@/components/stepper"
import { useCaptureFace } from "@/hooks/user/use-capture-face"
import { useEditProfile } from "@/hooks/user/use-edit-profile"
import { User, Camera, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { useLayout } from "@/context/layout-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

export const EditProfilePage = () => {
  const navigate = useNavigate()

  const { webcamRef, capturedFace, captureFace, handleCaptureSubmit } = useCaptureFace()
  const { userForm, handleEdit } = useEditProfile()
  const [loading, setLoading] = useState<boolean>(false)
  const [cameraAvailable, setCameraAvailable] = useState<boolean>(true)
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(3)
  const [captureSuccess, setCaptureSuccess] = useState<boolean>(false)
  const { fetchUser } = useAuth()
  const { startLoading, stopLoading } = useLayout()

  // Handle countdown and capture
  const startCountdown = useCallback(() => {
    setIsCountingDown(true)
    setCountdown(3)
    setCaptureSuccess(false)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (isCountingDown && countdown === 0) {
      captureFace()
      setIsCountingDown(false)
      setCaptureSuccess(true)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isCountingDown, countdown, captureFace])

  const handleFinalSubmit = async () => {
    startLoading()
    setLoading(true)
    const toastId = toast.loading("Updating profile...")
    try {
      const faceEncoding: Float64Array[] | undefined = await handleCaptureSubmit()
      if (faceEncoding === undefined) {
        toast.error("Error encoding face", { id: toastId })
        stopLoading()
        setLoading(false)
        return
      }
      await handleEdit(faceEncoding)
      await fetchUser()
      toast.success("Profile updated successfully", { id: toastId })
      navigate("/home")
    } catch (err: unknown) {
      if (typeof err === "string") toast.error(`Error updating profile: ${err}`, { id: toastId })
      stopLoading()
      setLoading(false)
    }
    stopLoading()
    setLoading(false)
  }

  const steps = [
    {
      title: "Step 1: User Information",
      description: "Enter your personal information.",
      content: (
        <FormProvider {...userForm}>
          <PersonalInformationForm />
        </FormProvider>
      ),
      onNext: async () => {
        const isValid = await userForm.trigger()
        return isValid
      },
    },
    {
      title: "Step 2: Face Capture",
      description: "Capture your face for verification.",
      content: (
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

          <Card className="overflow-hidden">
            <CardContent className="p-0 relative">
              {cameraAvailable ? (
                <>
                  <Webcam
                    ref={webcamRef}
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

                    {!isCountingDown && !capturedFace && (
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
            {capturedFace ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Face captured successfully!</span>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <img src={capturedFace || "/placeholder.svg"} alt="Captured Face" className="w-full object-cover" />
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
      ),
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>
      <Stepper steps={steps} onSubmit={handleFinalSubmit} showProgress loading={loading} />
    </div>
  )
}

