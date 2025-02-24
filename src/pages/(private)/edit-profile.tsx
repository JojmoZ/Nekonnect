import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userDto, userSchema } from "@/lib/model/dto/edit-user.dto";
import { UserService } from "@/services/user.service";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Principal } from "@dfinity/principal";
import { Button } from "@/components/ui/button";

const userService = new UserService();
export const EditProfilePage = () => {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username : ""
        }
    });

    const onSubmit = async (values : userDto) => {
        const resp = await userService.editUser({ username : values.username});
        console.log(resp);

        const user = await userService.me();
        console.log(user);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit,(err) => {console.log(err)})}>
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
                <Button type="submit"> Submit</Button>
            </form>
        </Form>
    )
};