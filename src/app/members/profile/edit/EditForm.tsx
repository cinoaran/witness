"use client";
import { updateMemberProfile } from "@/app/actions/userActions";
import Toast from "@/components/toasts/Toast";
import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { handleFomServerErrors } from "@/lib/util";

type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const [editSuccess, setEditSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, isSubmitted, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        username: member.username || "",
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data);

    if (result.status === "success") {
      setEditSuccess(true);
      router.refresh();
      reset({ ...data });
    } else {
      handleFomServerErrors(result, setError);
    }
  };

  return (
    <div className="space-y-5 rounded-lg bg-white/90 p-4">
      <h2 className="text-2xl">
        {editSuccess
          ? "Your profile update was successfully"
          : "Update your profile"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 text-white">
          <Input
            type="text"
            variant="underlined"
            label="Username"
            defaultValue={member.username || ""}
            size="lg"
            {...register("username")}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message as string}
          />
        </div>
        <div className="flex items-center gap-5 text-white">
          <Input
            type="text"
            variant="underlined"
            label="City"
            defaultValue={member.city}
            size="lg"
            {...register("city")}
            isInvalid={!!errors.city}
            errorMessage={errors.city?.message as string}
          />
          <Input
            type="text"
            variant="underlined"
            label="Country"
            defaultValue={member.country}
            size="lg"
            {...register("country")}
            isInvalid={!!errors.country}
            errorMessage={errors.country?.message as string}
          />
        </div>
        <div className="py-4 text-white">
          <Textarea
            variant="underlined"
            label="Your Description"
            defaultValue={member.description}
            size="lg"
            {...register("description")}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message as string}
            minRows={6}
          />
        </div>

        {errors.root?.serverError && (
          <div className="block w-full text-center">
            <Toast
              content={errors.root?.serverError.message as string}
              time={3000}
              bgColor="bg-red-400"
              textColor="text-white"
            />
          </div>
        )}

        <div className="w-full py-7">
          <Button
            type="submit"
            className="md:text-md w-full bg-slate-950 py-6 text-sm text-white"
            isDisabled={!isValid || !isDirty}
            isLoading={isSubmitting}
          >
            {isValid && !isDirty ? "No Changes" : "Edit your profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
