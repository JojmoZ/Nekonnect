import { loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Stepper from "@/components/stepper";
import { LoanPostService } from "@/services/loan-post.service";
import CreateLoanForm from "../../components/create-loan-form";
import AssuranceForm from "../../components/assurance-form";
import { assuranceSchema } from "@/lib/model/dto/upload-assurance.dto";
import { loanAgreementSchema } from "@/lib/model/dto/check-agreement.dto";
import LoanAgreementForm from "@/components/loan-agreement-form";

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

    const agreementForm = useForm<z.infer<typeof loanAgreementSchema>>({
        resolver: zodResolver(loanAgreementSchema),
        defaultValues: {
            terms: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof loanPostSchema>) => {
        console.log(values);
        console.log(assuranceForm.getValues());
        console.log(agreementForm.getValues());

        const isValid = await agreementForm.trigger();
        if (!isValid) return;

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
            title: "Step 3: Verification",
            description: "We should verify you before proceeding.",
            content: (
                <h1>Face Recognition</h1>
            ),
        },
        {
            title: "Step 4: Agreement",
            description: "Please read the agreement before submitting.",
            content: (
                <FormProvider {...agreementForm}>
                    <LoanAgreementForm />
                </FormProvider>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-5xl tracking-tight text-center mb-4">Apply for Loan</h1>
            <Stepper
                steps={steps}
                onSubmit={loanPostForm.handleSubmit(onSubmit)}
                showProgress={true}
            />
        </div>
    );
}

export default CreateLoanPostPage;