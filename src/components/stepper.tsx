import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Step {
    title: string;
    description: string;
    content: React.ReactNode;
    onNext?: () => Promise<boolean> | boolean;
}

interface StepperProps {
    steps: Step[];
    onSubmit: () => void;
    showProgress?: boolean;
    loading?: boolean;
}

function Stepper({ steps, onSubmit, showProgress = true, loading = false }: StepperProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = async () => {
        const currentStepConfig = steps[currentStep];

        if (currentStepConfig.onNext) {
            const canProceed = await currentStepConfig.onNext();
            if (!canProceed) {
                return; 
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
                {showProgress && <Progress value={progress} className="mt-4" />}
            </CardHeader>
            <CardContent>
                {steps[currentStep].content}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                    <Button onClick={onSubmit} disabled={loading}>{loading? "Submitting..." : "Submit"}</Button>
                ) : (
                    <Button onClick={handleNext}>Next</Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default Stepper;