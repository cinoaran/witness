"use client";

import React, { useState, useEffect } from "react";
import { GrInfo } from "react-icons/gr";

type Props = {
  content: string;
  time: number;
  textColor: string;
  bgColor: string;
};
const Toast = ({ content, time, textColor, bgColor }: Props) => {
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setMessageVisible(true);
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const messageTimeout = setInterval(() => {
      setMessageVisible(false);
    }, time);

    // Cleanup function to clear the Interval if the component unmounts
    return () => clearInterval(messageTimeout);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {messageVisible && (
        <div
          className={`flex w-full items-center gap-2 rounded-2xl border border-slate-100 ${bgColor} p-3 ${textColor} z-50`}
        >
          <span className="rounded-full bg-black p-2 text-center text-white">
            <GrInfo size={20} />
          </span>
          <p className="ml-10 text-center">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Toast;
