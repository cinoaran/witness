import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = ({ label }: { label?: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner label={label || "Loading ....."} />
    </div>
  );
};

export default Loading;
