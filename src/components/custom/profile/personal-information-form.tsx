import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

function PersonalInformationForm() {

  const form = useFormContext();
  const file = form.watch("image");

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

      {/* Profile Picture */}
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
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
              <Label>
                Selected File: {file ? file.name : 'No file is selected.'}
              </Label>
            </div>
            <FormDescription>This is your profile picture.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
}

export default PersonalInformationForm;
