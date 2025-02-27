import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const types = ["Passport", "Driver's License", "Voter's Card", "National ID Card"];

function AssuranceForm() {

    const form = useFormContext();
    const file = form.watch("assurance_file");

    return <>
        <form className="space-y-8">
            <FormField
                control={form.control}
                name="assurance_type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {types.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            This is your assurance type.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="assurance_file"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Assurance File</FormLabel>
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
                            <Label>Selected File: {file? file.name : "No file is selected."}</Label>
                        </div>
                        <FormDescription>This is your assurance file.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </form>
    </>
}

export default AssuranceForm;