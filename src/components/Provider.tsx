"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;
