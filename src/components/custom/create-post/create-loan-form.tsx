import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const categories = ["Education", "Community", "Technology", "Environment", "Arts & Culture", "Wellness"]

function CreateLoanForm() {

    const form = useFormContext();
    const file = form.watch("image");

    const [multiplier, setMultiplier] = useState<number>(0);
    const [interest, setInterest] = useState<number>(0);

    const calculateMultiplier = (monthlyRate: number, days: number): number => {
        const months = days / 30; 
        return Math.pow(1 + monthlyRate / 100, months); 
    };

    const loanDuration = form.watch("loanDuration");
    const goal = form.watch("goal");

    useEffect(() => {
        const newMultiplier = calculateMultiplier(0.5, loanDuration);
        setMultiplier(newMultiplier);
        setInterest(newMultiplier * goal);
    }, [loanDuration, goal]);
    
    return (
        <>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your post title.
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
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your post description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image File</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            field.onChange(e.target.files[0]);
                                        }
                                    }}
                                />
                            </FormControl>
                            <div className="mt-4">
                                <Label>Selected File: {file ? file.name : "No file is selected."}</Label>
                            </div>
                            <FormDescription>This is your post image.</FormDescription>
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
                                This is your goal for the loan.
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
                            <FormDescription>
                                This is your business category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="loanDuration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Loan Duration (in days)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the duration of the loan.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Card className="mt-4 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 divide-x">
                            <div className="p-4 text-center">
                                <p className="text-sm font-medium text-muted-foreground">Multiplier</p>
                                <p className="mt-1 text-2xl font-bold">{multiplier.toFixed(2)}x</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-sm font-medium text-muted-foreground">Repayment Total</p>
                                <p className="mt-1 text-2xl font-bold text-primary">${interest.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>

    );
}

export default CreateLoanForm;