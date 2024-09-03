"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import HeaderLogo from "@/components/logo/HeaderLogo";
import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import Toast from "@/components/toasts/Toast";
import { handleFormServerErrors } from "@/lib/util";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === "success") {
      router.push("/login");
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  return (
    <Card className="mx-auto max-w-7xl">
      <CardBody className="flex items-center p-0">
        <div className="flex w-full flex-col items-start justify-center md:flex-row">
          <div className="flex min-h-[auto] w-full flex-col items-center justify-center gap-14 bg-slate-100 py-4">
            <h1 className="text-shadow-sm md:text[4em] text-[3em] font-bold text-red-400">
              Register
            </h1>
            <HeaderLogo size="14em" textColor="text-red-400" />
            <div className="flex items-center justify-center gap-5 px-2 py-12">
              <span className="md:text-md text-sm">
                Already have an account?
              </span>
              <Button
                as={Link}
                className="bg-slate-950 text-white"
                href="/login"
              >
                Login
              </Button>
            </div>
          </div>
          <div className="w-full px-6">
            <h2 className="text-shadow-sm text-wrap py-9 text-center text-xl">
              Please enter your credentials to register!
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  variant="underlined"
                  label="Username"
                  {...register("username")}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message as string}
                  isRequired
                />
              </div>
              <div className="relative w-full">
                <Input
                  type="email"
                  variant="underlined"
                  label="Email"
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message as string}
                  isRequired
                />
              </div>
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  variant="underlined"
                  label="Password"
                  {...register("password")}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message as string}
                  isRequired
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </span>
              </div>
              <div className="relative w-full">
                <Input
                  defaultValue=""
                  type={showPassword ? "text" : "password"}
                  variant="underlined"
                  label="Confirm your password"
                  {...register("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message as string}
                  isRequired
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </span>
              </div>
              <div className="block w-full text-center">
                {errors.root?.serverError && (
                  <Toast
                    content={errors.root?.serverError.message as string}
                    time={3000}
                    bgColor="bg-red-400"
                    textColor="text-white"
                  />
                )}
              </div>
              <div className="w-full py-7">
                <Button
                  type="submit"
                  className="md:text-md w-full bg-slate-950 py-6 text-sm text-white"
                  isDisabled={!isValid}
                  isLoading={isSubmitting}
                >
                  {isValid ? "Register" : "Please provide all required fields"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
