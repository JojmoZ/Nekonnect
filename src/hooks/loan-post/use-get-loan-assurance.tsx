import { LoanAssurance } from "@/lib/model/entity/loan-assurance";
import { deserializeImage } from "@/lib/utils/Image";
import { LoanPostService } from "@/services/loan-post.service";
import { useEffect, useState } from "react";

const loanPostService = new LoanPostService();

export function useGetLoanAssurance(assuranceId: string) {
    const [assurance, setAssurance] = useState<LoanAssurance>()
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAssurance = async () => {
            const response = await loanPostService.getAssurance(assuranceId);
            setAssurance(response);
            setLoading(false);

            const content: any = response?.assuranceFile;
            if (content.length > 0) {
                setImageUrl(deserializeImage(content));
            }
        };

        fetchAssurance();
    }, [assuranceId]);

    return { assurance, imageUrl, getAssuranceLoading: loading };
}