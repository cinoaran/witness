import React from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
};

const DeleteButton = ({ loading }: Props) => {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!loading ? (
        <>
          <AiOutlineDelete
            size={30}
            className="absolute -right-[2px] -top-[2px] fill-white"
          />
          <AiFillDelete size={26} className={"fill-red-500/50"} />
        </>
      ) : (
        <PiSpinnerGap size={30} className="animate-spin fill-white" />
      )}
    </div>
  );
};

export default DeleteButton;
