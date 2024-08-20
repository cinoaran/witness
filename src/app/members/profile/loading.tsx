import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="my-auto flex items-center justify-center">
      <Spinner label="Loading..." labelColor="secondary" color="secondary" />
    </div>
  );
};

export default Loading;
