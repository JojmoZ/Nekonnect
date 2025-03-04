import { userSchema } from "@/lib/model/dto/edit-user.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import useServiceContext from "../use-service-context";
import { User } from "@/lib/model/entity/user";
import { useNavigate } from "react-router";
import { serializeImage } from "@/lib/utils/Image";

export function useEditProfile({ faceEncoding }: { faceEncoding: [Float64Array] | [] }) {

  const { userService } = useServiceContext();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
          username: "",
          dob: "",
          nationality: "",
          gender: "Other",
          email: "",
          image: undefined,
      },
  });

  const fetchUser = async () => {
    await userService.me().then((user) => {
      setUser(user);
      if (user) {
        form.setValue('username', user.username || '');
        form.setValue('dob', user.dob || '');
        form.setValue('nationality', user.nationality || '');
        form.setValue(
          'gender',
          (user.gender as 'Male' | 'Female' | 'Other') || 'Other',
        );
        form.setValue('email', user.email || '');
      } else {
        navigate('/login');
      }
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const edit = async () => {
    const userValues = form.getValues();
    await userService.editUser({
        ...userValues,
        internetIdentity: user!.internetIdentity!,
        balance: user!.balance,
        profilePicture: user!.profilePicture,
        faceEncoding
    });
  }

  return { userForm: form, handleEdit: edit };
}