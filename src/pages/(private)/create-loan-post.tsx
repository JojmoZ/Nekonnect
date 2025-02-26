import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loanPostSchema } from "@/lib/model/dto/create-loan-post.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Stepper from "@/components/stepper";

const categories = ["Education", "Community", "Technology", "Environment", "Arts & Culture", "Wellness"];

function CreateLoanForm() {
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

    const onSubmit = (values: z.infer<typeof loanPostSchema>) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("goal", values.goal.toString());
        formData.append("category", values.category);
        formData.append("loanDuration", values.loanDuration.toString());
        if (file) {
            formData.append("file", file);
        }
        console.log("Form Data:", Object.fromEntries(formData.entries()));
        alert("Form submitted!");
    };

    const steps = [
        {
            title: "Step 1: Title & Description",
            description: "Enter the title and description for your loan post.",
            content: (
                <>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter title" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
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
                                    <Input placeholder="Enter description" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            ),
        },
        {
            title: "Step 2: Goal & Category",
            description: "Set the goal amount and select a category.",
            content: (
                <>
                    <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
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
                </>
            ),
        },
        {
            title: "Step 3: Loan Duration & File Upload",
            description: "Set the loan duration and upload a file.",
            content: (
                <>
                    <FormField
                        control={form.control}
                        name="loanDuration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Duration</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
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
                                        setFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </FormControl>
                        <FormDescription>Upload a file related to your loan post.</FormDescription>
                        <FormMessage />
                    </FormItem>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-5xl tracking-tight text-center">Apply for Loan</h1>
            <Form {...form}>
                <Stepper
                    steps={steps}
                    onSubmit={form.handleSubmit(onSubmit)}
                    showProgress={true}
                />
            </Form>
        </div>
    );
}

export default CreateLoanForm;