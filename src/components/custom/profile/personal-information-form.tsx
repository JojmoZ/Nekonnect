import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

function PersonalInformationForm() {

  const form = useFormContext();

  return (
    <form className="space-y-8">
      {/* Username */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Date of Birth */}
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" placeholder="YYYY-MM-DD" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Nationality */}
      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>
            <FormControl>
              <Input placeholder="Nationality" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Gender Selection */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <select
                {...field}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </form>
  );
}

export default PersonalInformationForm;
