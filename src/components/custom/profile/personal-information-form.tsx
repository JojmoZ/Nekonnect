import ImagePreview from "@/components/image-preview";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const genders = ["Male", "Female", "Other"];

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flag: string;
}

function PersonalInformationForm() {

  const form = useFormContext();
  const file = form.watch("image");

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get<Country[]>(
          "https://restcountries.com/v3.1/all?fields=name,flag"
        );
        setCountries(res.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
            <FormMessage />
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
            <FormMessage />
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <FormControl>
                <SelectContent>
                  {countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => (
                    <SelectItem key={country.name.common} value={country.name.common}>
                      {country.name.common}
                    </SelectItem>
                  ))}
                </SelectContent>
              </FormControl>
            </Select>
            <FormMessage />
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <FormControl>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </FormControl>
            </Select>
            <FormMessage />
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
            <FormMessage />
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
              <div className="flex items-center gap-x-2 h-10">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                  className="flex-1"
                />
                <ImagePreview className="w-10 h-10 rounded-md" imageFile={field.value} />
              </div> 
            </FormControl>
            <div className="mt-4">
              <Label>
                Selected File: {field.value ? field.value.name : 'No file is selected.'}
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
}

export default PersonalInformationForm;
