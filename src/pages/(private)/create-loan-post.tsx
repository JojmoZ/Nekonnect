import { LoanPost } from "@/lib/model/entity/loan-post";
import { LoanPostService } from "@/services/loan-post.service";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loanPostDto, loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

let loanPostService = new LoanPostService();

function CreateLoanPostPage() {

    const form = useForm<z.infer<typeof loanPostSchema>>({
        resolver: zodResolver(loanPostSchema),
        defaultValues: {
            // id: "",
            title: "",
            description: "",
            amount: 0,
            assurance: 0,
            interest: 0,
            postDuration: 0
        }
    });

    const onSubmit = async (values: loanPostDto) => {

        console.log(values);

        const post: LoanPost = {
            title: values.title,
            description: values.description,
            amount: values.amount,
            assurance: values.assurance,
            interest: values.interest,
            postDuration: BigInt(values.postDuration)
        }
        console.log(post);

        const response = await loanPostService.createLoanPost(post.title, post.description, post.amount, post.assurance, post.interest, post.postDuration);
        console.log(response);
    }

    return (
        <>
            <h1 className="text-5xl tracking-tight text-center">Apply for Loan</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assurance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Assurance</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Interest</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postDuration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Duration</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>

    );
}

export default CreateLoanPostPage;