import { userSchema } from "@/lib/model/dto/edit-user.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import useServiceContext from "../use-service-context";
import { User } from "@/lib/model/entity/user";
import { useNavigate } from "react-router";
import { serializeImage } from "@/lib/utils/Image";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { useLayout } from "@/context/layout-context";

export function useEditProfile() {

  const { userService } = useServiceContext();
  const { me } = useAuth();
  const {startLoading, stopLoading} = useLayout();

  const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
          username: "",
          dob: "",
          nationality: "",
          gender: "",
          email: "",
          image: undefined,
      },
  });

  const handleForm = async () => {
      if (me && me.username != '') {
        form.setValue('username', me.username || '');
        form.setValue('dob', me.dob || '');
        form.setValue('nationality', me.nationality || '');
        form.setValue(
          'gender',
          me.gender || ''
        );
        form.setValue('email', me.email || '');
        form.setValue('image', new File([new Uint8Array(me.profilePicture)], "profilePicture.png"));
      } 
  }

  const handleFetch = async () => {
    toast.promise(handleForm(), {
      loading: 'Loading...',
      success: 'User fetched successfully',
      error: 'Failed to fetch user',
    });
  }

  useEffect(() => {
    if (me == null) return;
    handleFetch();
    console.log(form.getValues())
  }, [me]);

  const edit = async (faceEncoding: [] | Float64Array[]) => {
    startLoading();
    const userValues = form.getValues();
    await userService.editUser({
        ...userValues,
        internetIdentity: me!.internetIdentity!,
        balance: me!.balance,
        profilePicture: userValues.image
          ? await serializeImage(userValues.image) : [],
        faceEncoding: faceEncoding,
        role: me!.role
    });
    stopLoading();
  }

  return { userForm: form, handleEdit: edit };
}