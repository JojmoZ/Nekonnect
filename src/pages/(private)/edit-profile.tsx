import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userDto, userSchema } from "@/lib/model/dto/edit-user.dto";
import { UserService } from "@/services/user.service";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const userService = new UserService();

export const EditProfilePage = () => {
    const navigate = useNavigate()
    console.log(userService.me())
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            dob: "",
            nationality: "",
            gender: "Other",
            email: "",
        },
    });

    const onSubmit = async (values: userDto) => {
        try {
            const resp = await userService.editUser(values);
            console.log("Updated user:", resp);
            navigate('/temp')
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (err) => { console.log(err); })}>
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
                                <select {...field} className="w-full p-2 border border-gray-300 rounded">
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

                <Button type="submit" className="mt-4"> Save Changes </Button>
            </form>
        </Form>
    );
};
