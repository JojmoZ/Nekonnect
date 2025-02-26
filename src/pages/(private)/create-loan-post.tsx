import { LoanPost } from "@/lib/model/entity/loan-post";
import { LoanPostService } from "@/services/loan-post.service";
import { Button } from "@/components/ui/button";
import { bigint, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loanPostDto, loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

let loanPostService = new LoanPostService();
const categories = ["Education", "Community", "Technology", "Environment", "Arts & Culture", "Wellness"]

function CreateLoanPostPage() {

    const [file, setFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof loanPostSchema>>({
        resolver: zodResolver(loanPostSchema),
        defaultValues: {
            // id: "",
            title: "",
            description: "",
            goal: 0,
            category: "",
            loanDuration: 0
        }
    });

    const onSubmit = async (values: loanPostDto) => {

        console.log(values);

        const response = await loanPostService.createLoanPost(values.title, values.description, values.goal, values.category, BigInt(values.loanDuration));
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
                        name="goal"
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
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="loanDuration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Duration</FormLabel>
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
                    <FormItem>
                        <FormLabel>Upload File</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0]); // Store the selected file
                                    }
                                }}
                            />
                        </FormControl>
                        <FormDescription>Upload a file related to your loan post.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>

    );
}

export default CreateLoanPostPage;