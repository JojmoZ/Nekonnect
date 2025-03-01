import { loanAgreementSchema } from "@/lib/model/dto/check-agreement.dto";
import { loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { assuranceSchema } from "@/lib/model/dto/upload-assurance.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useServiceContext from "../use-service-context";
import { z } from "zod";

export function useCreateLoanPost() {
    const { loanPostService } = useServiceContext();

    const loanPostForm = useForm<z.infer<typeof loanPostSchema>>({
        resolver: zodResolver(loanPostSchema),
        defaultValues: {
            title: '',
            description: '',
            goal: 0,
            category: '',
            loanDuration: 0,
        },
    });

    const assuranceForm = useForm<z.infer<typeof assuranceSchema>>({
        resolver: zodResolver(assuranceSchema),
        defaultValues: {
            assurance_type: '',
            assurance_file: undefined,
        },
    });

    const agreementForm = useForm<z.infer<typeof loanAgreementSchema>>({
        resolver: zodResolver(loanAgreementSchema),
        defaultValues: {
            terms: false,
        },
    });

    const onCreate = async () => {
        const isValid = await agreementForm.trigger();
        if (!isValid) return;

        const loanPostValues = loanPostForm.getValues();
        const assuranceValues = assuranceForm.getValues();

        const arrayBuffer = await assuranceValues.assurance_file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        return await loanPostService.createLoanPost(
            loanPostValues.title,
            loanPostValues.description,
            Number(loanPostValues.goal),
            loanPostValues.category,
            BigInt(loanPostValues.loanDuration),
            assuranceValues.assurance_type,
            uint8Array,
        );
    };

    return { loanPostForm, assuranceForm, agreementForm, onCreate };

}