"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { HiPaperAirplane } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";
import { createMessage } from "@/app/actions/messageActions";
import { handleFormServerErrors } from "@/lib/util";
import Toast from "@/components/toasts/Toast";

const ChatForm = () => {
  const router = useRouter();

  const params = useParams<{ userId: string }>();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);
    if (result.status === "success") {
      reset();
      router.refresh();
      setTimeout(() => setFocus("text"), 50);
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex-col items-center justify-center"
    >
      <div className="relative">
        <Input
          fullWidth
          className="text-gray-900/50"
          size="sm"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          classNames={{
            errorMessage: "text-white",
          }}
          type="text"
          placeholder="Type your message here..."
        />

        <Button
          type="submit"
          className="absolute bottom-0 end-1 top-1 h-10 cursor-pointer rounded-br-lg rounded-tr-lg bg-blue-950/90 text-4xl text-white hover:bg-blue-950/40"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane />
        </Button>
      </div>

      {errors.root?.serverError && (
        <div className="my-5 block w-full text-center">
          <Toast
            content={errors.root?.serverError.message as string}
            time={4000}
            bgColor="bg-red-400"
            textColor="text-white"
          />
        </div>
      )}
    </form>
  );
};

export default ChatForm;
