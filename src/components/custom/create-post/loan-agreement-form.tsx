import { useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";

function LoanAgreementForm() {

    const form = useFormContext();
  const isChecked = useWatch({
    control: form.control,
    name: "terms",
  });
    return <form className="space-y-6">
    <FormField
      control={form.control}
      name="terms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
                Accept terms and conditions
            </FormLabel>
            <FormDescription>
                You agree to our Terms of Service and Privacy Policy.
            </FormDescription>
          <FormMessage />
          </div>
        </FormItem>
      )}
    />
  </form>
}

export default LoanAgreementForm;