import { loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Stepper from "@/components/stepper";
import { LoanPostService } from "@/services/loan-post.service";
import CreateLoanForm from "../../components/create-loan-form";
import AssuranceForm from "../../components/assurance-form";
import { assuranceSchema } from "@/lib/model/dto/upload-assurance.dto";

let loanPostService = new LoanPostService();

function CreateLoanPostPage() {

    const loanPostForm = useForm<z.infer<typeof loanPostSchema>>({
        resolver: zodResolver(loanPostSchema),
        defaultValues: {
            title: "",
            description: "",
            goal: 0,
            category: "",
            loanDuration: 0,
        },
    });

    const assuranceForm = useForm<z.infer<typeof assuranceSchema>>({
        resolver: zodResolver(assuranceSchema),
        defaultValues: {
            assurance_type: "",
            assurance_file: undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof loanPostSchema>) => {
        console.log(values);
        console.log(assuranceForm.getValues());

        const response = await loanPostService.createLoanPost(values.title, values.description, values.goal, values.category, BigInt(values.loanDuration));
        console.log(response);
        alert("Form submitted!");
    };

    const steps = [
        {
            title: "Step 1: Loan Details",
            description: "Enter the details for your loan post.",
            content: (
                <FormProvider {...loanPostForm}>
                    <CreateLoanForm/>
                </FormProvider>
            ),
            onNext: async () => {
                const isValid = await loanPostForm.trigger();
                return isValid;
            }
        },
        {
            title: "Step 2: Assurance",
            description: "Upload the assurance image.",
            content: (
                <FormProvider {...assuranceForm}>
                    <AssuranceForm />
                </FormProvider>
            ),
            onNext: async () => {
                const isValid = await assuranceForm.trigger();
                return isValid;
            }
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
                onSubmit={loanPostForm.handleSubmit(onSubmit)}
                showProgress={true}
            />
        </div>
    );
}

export default CreateLoanPostPage;