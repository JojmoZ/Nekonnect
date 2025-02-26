import { Input } from "@/components/ui/input";
import { loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Stepper from "@/components/stepper";
import { LoanPostService } from "@/services/loan-post.service";
import CreateLoanForm from "./create-loan-form";
import { Label } from "@/components/ui/label";

let loanPostService = new LoanPostService();

function CreateLoanPostPage() {
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof loanPostSchema>>({
        resolver: zodResolver(loanPostSchema),
        defaultValues: {
            title: "",
            description: "",
            goal: 0,
            category: "",
            loanDuration: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof loanPostSchema>) => {
        console.log(values);

        const response = await loanPostService.createLoanPost(values.title, values.description, values.goal, values.category, BigInt(values.loanDuration));
        console.log(response);
        alert("Form submitted!");
    };

    const steps = [
        {
            title: "Step 1: Loan Details",
            description: "Enter the details for your loan post.",
            content: (
                <FormProvider {...form}>
                    <CreateLoanForm/>
                </FormProvider>
            ),
            onNext: async () => {
                const isValid = await form.trigger();
                return isValid;
            }
        },
        {
            title: "Step 2: Assurance",
            description: "Upload the assurance image.",
            content: (
                <div className="space-y-2">
                    <Label>Upload File</Label>
                    <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                        />
                </div>
            ),
        },
        {
            title: "Step 3: Agreement",
            description: "Please read the agreement before submitting.",
            content: (
                <>

                    
                </>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-5xl tracking-tight text-center">Apply for Loan</h1>
            <Stepper
                steps={steps}
                onSubmit={form.handleSubmit(onSubmit)}
                showProgress={true}
            />
        </div>
    );
}

export default CreateLoanPostPage;