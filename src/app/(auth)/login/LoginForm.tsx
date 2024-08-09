"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import HeaderLogo from "@/components/logo/HeaderLogo";
import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import Toast from "@/components/toasts/Toast";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
      router.refresh();
    } else {
      setError("root.serverError", { message: result.error as string });
    }
  };

  return (
    <Card className="mx-auto max-w-7xl">
      <CardBody className="p-0">
        <div className="flex flex-col items-start justify-center md:flex-row">
          <div className="flex w-full flex-grow flex-col items-center justify-center gap-4 bg-slate-100 py-5">
            <h1 className="text-shadow-sm md:text[4em] text-[3em] font-bold text-red-400">
              Login
            </h1>
            <HeaderLogo size="14em" textColor="text-red-400" />
            <div className="flex items-center gap-5 px-2 py-5">
              <span className="md:text-md text-sm">Don't have an account?</span>
              <Button
                as={Link}
                className="bg-slate-950 text-white"
                href="/register"
              >
                Register
              </Button>
            </div>
          </div>
          <div className="w-full p-6">
            <h2 className="text-shadow-sm my-8 text-wrap text-center text-xl">
              Please enter your credentials to login!
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-10"
            >
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
              <div className="block w-full text-center">
                {errors.root?.serverError && (
                  <Toast
                    content={errors.root?.serverError.message as string}
                    time={5000}
                    bgColor="bg-red-400"
                    textColor="text-white"
                  />
                )}
              </div>

              <div className="w-full py-3">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  className="md:text-md w-full bg-slate-950 p-6 text-sm text-white"
                  isDisabled={!isValid}
                >
                  {isValid ? "Login" : "Please provide all required fields"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
