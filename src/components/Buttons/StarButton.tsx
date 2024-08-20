import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";
type Props = {
  selected: boolean;
  loading: boolean;
};

const StarButton = ({ selected, loading }: Props) => {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!loading ? (
        <>
          <AiOutlineStar
            size={32}
            className="absolute -right-[2px] -top-[2px] fill-white"
          />
          <AiFillStar
            size={28}
            className={selected ? "fill-red-500/50" : "fill-neutral-500/70"}
          />
        </>
      ) : (
        <PiSpinnerGap size={32} className="animate-spin fill-white" />
      )}
    </div>
  );
};

export default StarButton;
